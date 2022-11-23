import { ErrorCode } from "./ErrorCode";

export interface ErrorResponseBody {
  code: ErrorCode;
  message?: string;
  details?: any;
}
