import { Response } from "express";
import { Service } from "typedi";

@Service()
export class ResponseParser {
  /**
   * Method to set and send response back
   *
   * @param res
   */

  public static parseAndSend(
    httpCode: number,
    status: boolean,
    message: string,
    code: string,
    data: Record<string, unknown>,
    res: Response,
  ): void {
    res.status(httpCode).json({
      status,
      message,
      code,
      data,
    });
  }
  private resHttpCode: number;
  private resMessage: string;
  private resCode: string;
  private resBody: unknown;
  private resHeader: object;
  constructor() {
    this.resHttpCode = 200;
    this.resMessage = "";
    this.resCode = "SUC10000";
    this.resBody = {};
    this.resHeader = {};
  }

  /**
   * Setter for httpCode for response
   *
   * @param httpCode
   */

  public setHttpCode(httpCode: number): this {
    this.resHttpCode = httpCode;
    return this;
  }

  /**
   * Setter for message of response
   *
   * @param message
   */

  public setMessage(message: string): this {
    this.resMessage = message;
    return this;
  }

  /**
   * Setter for code of response
   *
   * @param message
   */

  public setResponseCode(code: string): this {
    this.resCode = code;
    return this;
  }

  /**
   * Setter for body of response
   *
   * @param body
   */

  public setBody<T>(body: T): this {
    this.resBody = body;
    return this;
  }

  public setResponseHeader(header: object): this {
    this.resHeader = header;
    return this;
  }

  /**
   * Method to send response back
   *
   * @param res
   */

  public send(res: Response): Response {
    const headersToSet = Object.entries(this.resHeader);
    headersToSet.forEach((element) => {
      res.setHeader(element[0], element[1]);
    });
    return res.status(this.resHttpCode).json({
      message: this.resMessage,
      code: this.resCode,
      data: this.resBody,
    });
  }
}
