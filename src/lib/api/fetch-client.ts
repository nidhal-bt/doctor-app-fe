import { appEnv } from "@/src/config/env";
import { ApiError } from "./api-error";

interface FetchOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
}

export class FetchClient {
  private static getBaseUrl(): string {
    if (typeof window === "undefined") {
      return appEnv.API_URL;
    }
    return appEnv.NEXT_PUBLIC_API_URL;
  }

  static async request(options: FetchOptions): Promise<unknown> {
    const { method, url, body, params, headers, cache, next } = options;

    const urlObj = new URL(`${this.getBaseUrl()}/api${url}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(urlObj.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...(cache ? { cache } : {}),
      ...(next ? { next } : {}),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new ApiError(
        error.statusCode || res.status,
        error.message || "Something went wrong",
        error.path,
      );
    }

    return res.json();
  }
}