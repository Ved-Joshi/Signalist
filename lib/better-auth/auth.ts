import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getMongoDb } from "@/lib/mongo-client";

declare global {
    // eslint-disable-next-line no-var
    var __betterAuth__: ReturnType<typeof betterAuth> | null | undefined;
}

let authInstance: ReturnType<typeof betterAuth> | null = globalThis.__betterAuth__ ?? null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    const db = await getMongoDb();

    const instance = betterAuth({
        database: mongodbAdapter(db as any),
        secret: process.env.BETTER_AUTH_SECRET!,
        baseURL: process.env.BETTER_AUTH_URL!,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    });

    authInstance = instance;
    globalThis.__betterAuth__ = instance;

    return instance;
};

export const auth = await getAuth();