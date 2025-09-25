import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db";
import * as schema from "../db/schema/index";

export const auth = betterAuth<BetterAuthOptions>({
  baseURL: "http://localhost:3000",
  trustedOrigins: ["http://localhost:3001"],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
  advanced: {
    database: {
      generateId: false,
    },
    cookies: {
      session_token: {
        name: "task-ai",
      },
    },
    cookiePrefix: "task-ai",
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      domain: "localhost",
    },
  },
});
