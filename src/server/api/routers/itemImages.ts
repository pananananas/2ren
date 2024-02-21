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
});
