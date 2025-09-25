import type { User } from "better-auth";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import type db from "~~/lib/drizzle";

declare module "h3" {
  interface H3EventContext {
    userId?: string;
    user?: User;
    gemini?: GoogleGenAI;
    db?: typeof db;
    cloudinary?: typeof cloudinary;
  }
}
