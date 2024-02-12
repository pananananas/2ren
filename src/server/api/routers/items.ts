import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
