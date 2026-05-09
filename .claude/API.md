# API Layer — Usage Guide

All HTTP calls go through `src/lib/api/`. See `ARCHITECTURE.md` for the rules summary.

---

## Creating a feature endpoint

```ts
// src/features/auth/api/login-api.ts
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
```

## GET endpoint (no body)

```ts
export const getMeApi = new ApiEndpoint({
  endpoint: "/auth/me",
  method: "GET",
  responseSchema: userSchema,
  transform: (raw) => raw,
});
```

## Calling an endpoint

```ts
// POST — args inferred from bodySchema
const result = await loginApi.execute({ email, password });

// GET — execute() takes no arguments
const user = await getMeApi.execute();
```

## Catching errors in a server action

```ts
import { ApiError } from "@/src/lib/api/api-error";

try {
  const result = await loginApi.execute({ email, password });
  // ...
} catch (err) {
  if (err instanceof ApiError) {
    // err.statusCode, err.message, err.path
  }
}
```
