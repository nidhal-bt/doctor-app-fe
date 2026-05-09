import { appEnv } from "@/src/config/env";
import { z, ZodType } from "zod";

export function validate<S extends ZodType>(
  data: unknown,
  schema: S,
  label: string,
): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    if (appEnv.NODE_ENV !== "production") {
      console.error(`[${label}] Validation failed: ${result.error.message}`);
    }
    throw new Error(`[${label}] Validation failed: ${result.error.message}`);
  }
  return result.data;
}