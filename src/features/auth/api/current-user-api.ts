import { ApiEndpoint } from "@/src/lib/api/api-endpoint";
import { z } from "zod";
import { IUserRole } from "@/src/features/user/types/type";

const responseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  avatarUrl: z.string().nullable(),
  role: z.enum(IUserRole),
  createdAt: z.string(),
});

export const currentUserApi = new ApiEndpoint({
  endpoint: "/auth/me",
  method: "GET",
  responseSchema,
  transform: (raw) => ({
    id: raw.id,
    email: raw.email,
    firstName: raw.firstName,
    lastName: raw.lastName,
    phone: raw.phone,
    avatarUrl: raw.avatarUrl,
    role: raw.role,
    createdAt: raw.createdAt,
  }),
});
