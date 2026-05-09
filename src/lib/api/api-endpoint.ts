import { z, ZodType } from "zod";
import { validate } from "./api-validator";
import { FetchClient } from "./fetch-client";


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

  async execute(
    ...args: TRequest extends void ? [] : [params: TRequest]
  ): Promise<TOutput> {
    const { endpoint, method, responseSchema, transform, bodySchema } = this.config;
    const params = args[0] as TRequest | undefined;

    if (bodySchema && params) {
      validate(params, bodySchema, `Request ${method} ${endpoint}`);
    }

    const raw = await FetchClient.request({
      url: endpoint,
      method,
      ...(method === "GET"
        ? { params: params as Record<string, string | number | undefined> }
        : { body: params }),
    });

    const validated = validate(raw, responseSchema, `Response ${method} ${endpoint}`);
    return transform(validated);
  }
}