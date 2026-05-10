import { ApiEndpoint } from "@/src/lib/api/api-endpoint";
import { z } from "zod";

const bodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});

const responseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const signupApi = new ApiEndpoint({
  endpoint: "/auth/sign-up",
  method: "POST",
  bodySchema,
  responseSchema,
  transform: (raw) => ({
    accessToken: raw.access_token,
    tokenType: raw.token_type,
  }),
});
