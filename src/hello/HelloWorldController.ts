import { Controller, Get, Route, SuccessResponse } from "tsoa";

@Route("HelloWorld")
export class HelloWorldController extends Controller {
  @Get()
  @SuccessResponse(200)
  public async helloWorld(): Promise<String> {
    return "Hello World!";
  }
}
