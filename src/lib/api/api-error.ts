export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public override message: string,
    public path?: string,
  ) {
    super(message);
  }
}