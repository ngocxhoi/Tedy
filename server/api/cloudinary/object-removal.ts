import { UploadApiResponse } from "cloudinary";

export default defineEventHandler(async (event) => {
  const cloudinary = event.context.cloudinary;
  if (!cloudinary) {
    throw createError({
      statusCode: 500,
      message: "Cloudinary not configured",
    });
  }

  const formData = await readFormData(event);
  const title = formData.get("title") as string;
  const file = formData.get("image") as File;
  if (!title || !file) {
    throw createError({
      statusCode: 400,
      message: "Title and image file are required",
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
              effect: `gen_remove:prompt_(${title})`,
            },
          ],
          folder: "object-removed",
        },
        (error, result) => {
          if (error || !result) {
            reject(
              createError({
                statusCode: 500,
                message: "Object removal failed",
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
