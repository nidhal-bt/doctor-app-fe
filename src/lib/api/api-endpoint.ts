import { z, ZodType } from "zod";
import { validate } from "./api-validator";
import { FetchClient } from "./fetch-client";

interface RequestOptions {
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
}

interface EndpointConfig<
  TResponse extends ZodType,
  TOutput,
  TBody extends ZodType | undefined = undefined,
> {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  responseSchema: TResponse;
  transform: (raw: z.infer<TResponse>) => TOutput;
  bodySchema?: TBody;
}

export class ApiEndpoint<
  TResponse extends ZodType,
  TOutput,
  TBody extends ZodType | undefined = undefined,
  TRequest = TBody extends ZodType ? z.infer<TBody> : void,
> {
  private config: EndpointConfig<TResponse, TOutput, TBody>;

  constructor(config: EndpointConfig<TResponse, TOutput, TBody>) {
    this.config = config;
  }

  /**
   * Executes the API call.
   *
   * @param params - Request data: body for POST/PATCH, query params for GET, undefined for no input.
   * @param options - Optional fetch config: headers, cache, next (revalidation/tags).
   * @returns Validated and transformed response.
   *
   * @example
   * // No params
   * await getMeApi.execute();
   *
   * // With body (POST)
   * await loginApi.execute({ email, password });
   *
   * // With query params (GET)
   * await getDoctorsApi.execute({ page: 1, limit: 10 });
   *
   * // With options
   * await getMeApi.execute(undefined, {
   *   headers: { Authorization: `Bearer ${token}` },
   *   cache: "no-store",
   * });
   */
  async execute(
    params?: TRequest extends void ? undefined : TRequest,
    options?: RequestOptions,
  ): Promise<TOutput> {
    const { endpoint, method, responseSchema, transform, bodySchema } =
      this.config;

    if (bodySchema && params) {
      validate(params, bodySchema, `Request ${method} ${endpoint}`);
    }

    const raw = await FetchClient.request({
      url: endpoint,
      method,
      ...(method === "GET"
        ? { params: params as Record<string, string | number | undefined> }
        : { body: params }),
      ...options,
    });

    const validated = validate(
      raw,
      responseSchema,
      `Response ${method} ${endpoint}`,
    );
    return transform(validated);
  }
}
