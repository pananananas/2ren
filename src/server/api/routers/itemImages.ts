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

  deleteImage: privateProcedure
    .input(
      z.object({
        key: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await utapi.deleteFiles(input.key);
      console.log("deleted from uploadthing");

      // Delete the ItemImage record from the database
      const deleteResult = await ctx.db.itemImage.deleteMany({
        where: {
          key: input.key,
        },
      });

      return deleteResult;
    }),
});
