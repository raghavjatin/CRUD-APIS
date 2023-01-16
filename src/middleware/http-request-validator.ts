import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ResponseParser } from "../util/response-parser";

class HttpRequestValidator {
  public responseParser: ResponseParser;

  constructor() {
    this.responseParser = new ResponseParser();
  }

  /**
   * Private method to validate data againt Joi schema
   *
   * @param data
   * @param schema
   */
  public validate(type: "body" | "params" | "query", schema: Joi.ObjectSchema<unknown>) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const data = req[type];
      const { error } = schema.validate(data);
      if (error === undefined) {
        next();
        return;
      }
      this.handleValidationError(error);
      this.responseParser.send(res);
    };
  }

  private async handleValidationError(error: Joi.ValidationError): Promise<void> {
    const err: Record<string, unknown>[] = [];
    error.details.forEach((element: Joi.ValidationErrorItem) => {
      err.push({
        message: element.message,
        label: element.context?.key,
      });
    });
    this.responseParser
      .setHttpCode(400)
      .setResponseCode("validation_error")
      .setMessage("Validation Error")
      .setBody(err);
  }
}

export default HttpRequestValidator;
