import { utapi } from "~/server/uploadthing";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const itemImagesRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        imageUrl: z.string().max(1000),
        key: z.string().max(1000),
        itemId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { imageUrl, key, itemId } = input;

      const itemImage = await ctx.db.itemImage.create({
        data: {
          imageUrl,
          key,
          itemId,
        },
      });

      return itemImage;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const itemImages = await ctx.db.itemImage.findMany();

    return itemImages;
  }),
  deleteImageFromUPT: privateProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await utapi.deleteFiles(input);

      console.log("Deletion succeeded");

      return;
    }),

  clearUntrackedUptFiles: privateProcedure.mutation(async ({ ctx }) => {
    // Step 1: Retrieve the list of files from uploadthing
    const uptFiles = await utapi.listFiles({ limit: 100 });

    // Step 2: Fetch the list of image keys from your database
    const dbKeys = await ctx.db.itemImage.findMany({
      select: {
        key: true, // Only fetch the 'key' field
      },
    });
    const trackedKeys = dbKeys.map((dbFile) => dbFile.key);

    console.log("trackedKeys", trackedKeys);

    // Step 3: Identify untracked files
    const untrackedFiles = uptFiles.filter(
      (uptFile) => !trackedKeys.includes(uptFile.key),
    );

    // Step 4: Delete untracked files from uploadthing
    for (const file of untrackedFiles) {
      try {
        await utapi.deleteFiles(file.key); // Assuming deleteImageFromUPT is available in the scope
        console.log(`Deletion succeeded for file: ${file.key}`);
      } catch (error) {
        console.error(`Deletion failed for file: ${file.key}`, error);
      }
    }

    console.log(
      `Completed clearing untracked files. Total deleted: ${untrackedFiles.length}`,
    );
    return { deletedCount: untrackedFiles.length };
  }),
});
