import { ApiEndpoint } from "@/src/lib/api/api-endpoint";
import { z } from "zod";


const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const responseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const loginApi = new ApiEndpoint({
  endpoint: "/auth/sign-in",
  method: "POST",
  bodySchema,
  responseSchema,
  transform: (raw) => ({
    accessToken: raw.access_token,
    tokenType: raw.token_type,
  }),
});