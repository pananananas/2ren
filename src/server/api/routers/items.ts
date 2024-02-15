import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
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

    // console.log(users);  console log user info saved in the database

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
        image: z.string().max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorID = ctx.userId;

      const item = await ctx.db.item.create({
        data: {
          authorID: authorID,
          ...input,
        },
      });

      return item;
    }),
  delete: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const authorID = ctx.userId;

      const item = await ctx.db.item.deleteMany({
        where: {
          id: input,
          authorID: authorID,
        },
      });

      return item;
    }),
  // edit: privateProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       name: z.string().min(1).max(280),
  //       color: z.string().max(100),
  //       material: z.string().min(1).max(280),
  //       category: z.string().min(1).max(280),
  //       price: z.string().max(280),
  //       currency: z.string().max(280),
  //       amount: z.string().max(280),
  //       display: z.boolean(),
  //       description: z.string().min(0).max(1000),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const authorID = ctx.userId;

  //     const item = await ctx.db.item.updateMany({
  //       where: {
  //         id: input.id,
  //         authorID: authorID,
  //       },
  //       data: input,
  //     });

  //     return item;
  //   }),
});
