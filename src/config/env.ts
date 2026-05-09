import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url({
    error: "NEXT_PUBLIC_API_URL must be a valid URL (e.g. http://localhost:8000/api)",
  }),
  API_URL: z.string().url({
    error: "API_URL must be a valid URL (e.g. http://localhost:8000/api)",
  }),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  API_URL: process.env.API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_parsed.success) {
  const formatted = _parsed.error.format();
  throw new Error(
    `[env] Invalid environment variables:\n${JSON.stringify(formatted, null, 2)}`
  );
}

export const appEnv = _parsed.data;
