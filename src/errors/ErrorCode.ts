import { ErrorResponse } from "./ErrorResponse";

export enum ErrorCode {
  UNKNOWN = "UNKNOWN_ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_SYNTAX = "BAD_SYNTAX",
  BAD_REQUEST = "BAD_REQUEST",
}

// export const ERROR_CODE_RESPONSE_MAP: {
//   [key in keyof typeof ErrorCode]: HttpStatusCodeStringLiteral;
// } = {
//   UNKNOWN: "500",
//   BAD_SYNTAX: "400",
//   BAD_REQUEST: "400",
//   NOT_FOUND: "404",
// };

// NOTE: I would love to do the above, but tsoa will not accept it. The below will do for now.
export enum ErrorCodeHttp {
  UNKNOWN = 500,
  NOT_FOUND = 404,
  BAD_SYNTAX = 400,
  BAD_REQUEST = 400,
}

export const ERR_400_DESCRIPTION: string =
  "Bad syntax, bad typing, or otherwise bad request";
export const ERR_400_EXAMPLE: ErrorResponse = {
  error: {
    code: ErrorCode.BAD_REQUEST,
    message: "unable to validate example request",
    details: {
      "requestBody.exampleField": {
        message: "invalid string value",
        value: 1,
      },
    },
  },
};

export const ERR_500_DESCRIPTION: string = "Unknown error";
export const ERR_500_EXAMPLE: ErrorResponse = {
  error: {
    code: ErrorCode.UNKNOWN,
    message: "string",
    details: "string",
  },
};

// This one should be described manually
export const ERR_404_EXAMPLE: ErrorResponse = {
  error: {
    code: ErrorCode.NOT_FOUND,
    message: "string",
    details: "string",
  },
};
