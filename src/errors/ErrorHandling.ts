import { HttpError } from "koa";
import { TsoaResponse } from "tsoa";
import { ErrorCode } from "./ErrorCode";
import { ErrorResponse } from "./ErrorResponse";

export const errorHandlerMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.type = "json";

    if (err instanceof SyntaxError || err instanceof TypeError)
      // errors thrown by koa-bodyparser
      return applyBadSyntaxErrorToCtx(ctx, err.message);

    if (isValidationError(err))
      return applyValidationErrorToCtx(ctx, err?.message);

    // TODO Need some logging here to know what went on
    applyUnknownErrorToCtx(ctx, err);
  }
};

const isValidationError = (err) => {
  // TODO this is hacky, follow https://github.com/koajs/koa/blob/master/docs/error-handling.md
  return (
    err instanceof HttpError &&
    err.status === 400 &&
    err.message.startsWith('{"fields":{"')
  );
};

export const applyBadSyntaxErrorToCtx = (ctx: any, message?: string) => {
  ctx.status = 400;
  const res: ErrorResponse = {
    error: {
      code: ErrorCode.BAD_SYNTAX,
      message,
    },
  };
  ctx.body = res;
};

const applyValidationErrorToCtx = (ctx: any, message?: string) => {
  ctx.status = 429;
  const res: ErrorResponse = {
    error: {
      code: ErrorCode.BAD_REQUEST,
      message: "unable to validate request",
      details: JSON.parse(message ?? "{}")?.fields,
    },
  };
  ctx.body = res;
};

export const applyUnknownErrorToCtx = (ctx: any, _err: any) => {
  // TODO Log something, see below for some hints
  // ctx.status = err.statusCode || err.status || 500;
  // ctx.body = {
  //   error: {
  //     code: ctx.status,
  //     message: err.message,
  //   },
  // };
  ctx.status = 500;
  const res: ErrorResponse = {
    error: {
      code: ErrorCode.UNKNOWN,
    },
  };
  ctx.body = res;
  console.log(_err); // tslint:disable-line: no-console
};

export const raiseNotFound = (
  notFoundFunc: TsoaResponse<404, ErrorResponse>,
  message?: string
) => {
  return notFoundFunc(404, {
    error: {
      code: ErrorCode.NOT_FOUND,
      message,
    },
  });
};

export const raiseBadRequest = (
  badRequestFunc: TsoaResponse<400, ErrorResponse>,
  message?: string
) => {
  return badRequestFunc(400, {
    error: {
      code: ErrorCode.BAD_REQUEST,
      message,
    },
  });
};

export const raiseUnknownError = (
  unknownErrorFunc: TsoaResponse<500, ErrorResponse>,
  message?: string
) => {
  return unknownErrorFunc(500, {
    error: {
      code: ErrorCode.UNKNOWN,
      message,
    },
  });
};
