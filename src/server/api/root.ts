import { itemsRouter } from "~/server/api/routers/items";
import { itemImagesRouter } from "~/server/api/routers/itemImages";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  items: itemsRouter,
  itemImages: itemImagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
