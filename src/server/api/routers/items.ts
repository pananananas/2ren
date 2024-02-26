import type { User } from "@clerk/nextjs/server";
import { utapi } from "~/server/uploadthing";
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForCLient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phoneNumber: user.phoneNumbers,
    email: user.emailAddresses,
    profileImage: user.imageUrl,
  };
};

export const itemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.item.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const users = (
      await clerkClient.users.getUserList({
        limit: 100,
        userId: items.map((item) => item.authorID),
      })
    ).map(filterUserForCLient);

    // console.log(users);  //console log user info saved in the database

    // console.log("uploadthing files", await utapi.listFiles({ limit: 1000 }));

    return items.map((item) => ({
      item,
      author: users.find((user) => user.id === item.authorID),
    }));
  }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
        color: z.string().max(100),
        material: z.string().max(280),
        category: z.string().min(1).max(280),
        price: z.string().max(280),
        currency: z.string().max(280),
        amount: z.string().max(280),
        display: z.boolean(),
        description: z.string().min(0).max(1000),
        images: z.array(
          z.object({
            // Expect an array of objects for images
            imageUrl: z.string().max(1000),
            key: z.string().max(1000),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { images, ...itemData } = input;
      const authorID = ctx.userId;

      const item = await ctx.db.item.create({
        data: {
          authorID: authorID,
          ...itemData,
        },
      });
      //  if images array is empty, return the item
      if (images.length === 0) {
        return item;
      }

      // Create ItemImage records for each image
      const imageRecords = images.map((imageData) => ({
        imageUrl: imageData.imageUrl,
        key: imageData.key,
        itemId: item.id,
      }));

      // Use Promise.all for concurrent creation of item image records
      await Promise.all(
        imageRecords.map((imgData) =>
          ctx.db.itemImage.create({
            data: imgData,
          }),
        ),
      );

      return item;
    }),

  delete: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      // const authorID = ctx.userId;

      const itemImages = await ctx.db.itemImage.findMany({
        where: {
          itemId: input,
        },
      });

      await Promise.all(
        itemImages.map(async (itemImage) => {
          await utapi.deleteFiles(itemImage.key);
          return ctx.db.itemImage.delete({
            where: {
              id: itemImage.id,
            },
          });
        }),
      );

      const item = await ctx.db.item.deleteMany({
        where: {
          id: input,
          // authorID: authorID,
        },
      });

      return item;
    }),

  edit: privateProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(280),
        color: z.string().max(100),
        material: z.string().max(280),
        category: z.string().min(1).max(280),
        price: z.string().max(280),
        currency: z.string().max(280),
        amount: z.string().max(280),
        display: z.boolean(),
        description: z.string().min(0).max(1000),
        images: z.array(
          z.object({
            // Expect an array of objects for images
            imageUrl: z.string().max(1000),
            key: z.string().max(1000),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { images, ...itemData } = input;
      const authorID = ctx.userId;

      const item = await ctx.db.item.update({
        where: {
          id: itemData.id,
        },
        data: {
          authorID: authorID,
          ...itemData,
        },
      });

      // Delete old images
      const oldImages = await ctx.db.itemImage.findMany({
        where: {
          itemId: item.id,
        },
      });

      await Promise.all(
        oldImages.map(async (itemImage) => {
          await utapi.deleteFiles(itemImage.key);
          return ctx.db.itemImage.delete({
            where: {
              id: itemImage.id,
            },
          });
        }),
      );

      // Create ItemImage records for each new image

      const imageRecords = images.map((imageData) => ({
        imageUrl: imageData.imageUrl,
        key: imageData.key,
        itemId: item.id,
      }));

      // Use Promise.all for concurrent creation of item image records
      await Promise.all(
        imageRecords.map((imgData) =>
          ctx.db.itemImage.create({
            data: imgData,
          }),
        ),
      );

      return item;
    }),

  editDisplay: privateProcedure
    .input(
      z.object({
        id: z.number(),
        display: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.item.update({
        where: {
          id: input.id,
        },
        data: {
          display: input.display,
        },
      });

      return item;
    }),
    
    deleteMultiple: privateProcedure
    .input(z.array(z.number()))
    .mutation(async ({ ctx, input }) => {
      const itemImages = await ctx.db.itemImage.findMany({
        where: {
          itemId: {
            in: input,
          },
        },
      });

      await Promise.all(
        itemImages.map(async (itemImage) => {
          await utapi.deleteFiles(itemImage.key);
          return ctx.db.itemImage.delete({
            where: {
              id: itemImage.id,
            },
          });
        }),
      );

      const items = await ctx.db.item.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      return items;
    }),
});
