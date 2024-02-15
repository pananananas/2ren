import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// Define the props type for ImageDropzone
type ImageDropzoneProps = {
  onFileUploaded: (file: File) => void;
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onFileUploaded }) => {
  // Explicitly set the type of the state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Assuming you only need the first file
      const file = acceptedFiles[0];
      if (!file) return;
      setSelectedFile(file);
      onFileUploaded(file); // No need to check if onFileUploaded exists because it's required by the type
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default ImageDropzone;
