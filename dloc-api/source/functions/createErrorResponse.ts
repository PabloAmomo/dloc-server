import { Response } from "../models/Response";

const createErrorResponse = (code: number, message: string, data: any): Response => {
  return { code, result: { data, message } };
};

export { createErrorResponse };