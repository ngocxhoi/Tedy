import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../drizzle";
import * as schema from "../drizzle/db/schema";
import sendEmail from "../mailtrap";
import timeStringToSecond from "~~/shared/utils/time-string-to-second.ts";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      ...schema,
    },
  }),
  session: {
    expiresIn: timeStringToSecond(process.env.SESSION_EXPIRATION as string),
    updateAge: timeStringToSecond(process.env.SESSION_UPDATEAGE as string),
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    enabled: true,
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log(token);
      if (user.emailVerified) return;
      await sendEmail(user.email, token);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
    },
  },
});
