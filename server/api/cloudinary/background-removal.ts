import { UploadApiResponse } from "cloudinary";
import { effect } from "vue";
import cloudinary from "~~/shared/utils/tools/cloudinary";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("image") as File;
  if (!file) {
    throw createError({
      statusCode: 400,
      message: "No image file provided",
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadFromBuffer = (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
            {
              effect: "background_removal",
              background: "transparent",
            },
          ],
          folder: "bg-removed",
        },
        (error, result) => {
          if (error || !result) {
            reject(
              createError({
                statusCode: 500,
                message: "Background removal failed",
              })
            );
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  };

  const result = await uploadFromBuffer();

  return {
    message: "Background removal successful",
    url: result.secure_url,
  };
});
