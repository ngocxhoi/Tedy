import { v2 as cloudinary } from "cloudinary";
import { GoogleGenAI } from "@google/genai";
import db from "~~/lib/drizzle";

export default defineNitroPlugin((nitroApp) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  nitroApp.hooks.hook("request", (event) => {
    event.context.cloudinary = cloudinary;
    event.context.gemini = gemini;
    event.context.db = db;
  });
});
