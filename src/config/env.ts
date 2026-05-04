import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url({
    error: "NEXT_PUBLIC_API_URL must be a valid URL (e.g. http://localhost:8000/api)",
  }),
});

const _parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_parsed.success) {
  const formatted = _parsed.error.format();
  throw new Error(
    `[env] Invalid environment variables:\n${JSON.stringify(formatted, null, 2)}`
  );
}

export const env = _parsed.data;
