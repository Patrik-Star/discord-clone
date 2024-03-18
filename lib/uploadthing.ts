import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
   
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// GenerateComponenets is depricated
// export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>