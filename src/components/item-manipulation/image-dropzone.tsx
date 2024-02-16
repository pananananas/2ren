import { UploadDropzone } from "~/utils/uploadthing";

export default function ImageDropzone() {
  return (
    <div>
      <UploadDropzone
        className="ut-label:text-m ut-button:bg-gray-900 p-3 ut-label:text-gray-900 ut-allowed-content:ut-uploading:text-red-400"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
