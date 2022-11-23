import { Controller, Get, Route, SuccessResponse, Tags, Response } from "tsoa";
import { ERR_500_DESCRIPTION, ERR_500_EXAMPLE } from "./errors/ErrorCode";
import { ErrorResponse } from "./errors/ErrorResponse";
import swagger from "../build/swagger.json";

@Route("swagger.json")
@Tags("Swagger")
export class SwaggerController extends Controller {
  /**
   * TODO: Descriptive text here
   * @summary Get swagger.json
   */
  @Get()
  @SuccessResponse(200)
  @Response<ErrorResponse>(500, ERR_500_DESCRIPTION, ERR_500_EXAMPLE)
  public async getSwagger() {
    return swagger;
  }
}
