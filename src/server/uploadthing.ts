import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { UTApi } from "uploadthing/server";
 
export const utapi = new UTApi();
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "16MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("file url", file.url);
      return {};
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
