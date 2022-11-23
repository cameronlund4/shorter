import Koa from "koa";
import KoaRouter from "@koa/router";
import { koaSwagger } from "koa2-swagger-ui";
import { RegisterRoutes } from "../build/routes";
import bodyParser from "koa-bodyparser";
import * as dotenv from "dotenv";
import { errorHandlerMiddleware } from "./errors/ErrorHandling";
import cors from "@koa/cors";

// NOTE: Dependency injection https://tsoa-community.github.io/docs/di.html#ioc-module

dotenv.config();

const app = new Koa();
app.use(cors());
app.use(errorHandlerMiddleware);
app.use(bodyParser());

// Load swagger
app.use(
  koaSwagger({
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// Register tsoa routes
const router = new KoaRouter();
RegisterRoutes(router);
app
  .use((ctx, next) => {
    // console.log(ctx.req.body);
    return next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
