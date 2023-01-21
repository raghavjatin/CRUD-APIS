import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import constant from "../../config/constant";
import { ResponseParser } from "../../util/response-parser";
import { LeaveService } from "../../service/leave.service";

@Service()
class LeaveController {
  constructor(
    private readonly leaveService: LeaveService,
    private readonly responseParser: ResponseParser,
  ) {
    this.leaveService = new LeaveService();
  }

  public findLeaves = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const result = await this.leaveService.findAllLeaves();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("leave found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createLeave = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const result = await this.leaveService.createLeave(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("leave created successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateLeave = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const {
        params: { id },
      } = req;
      const result = await this.leaveService.updateLeave(data, id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("update leave successfully")
        .send(res);
    } catch (err) {
      res.status(err.status);
      res.json({
        error: {
          message: err.message,
        },
      });
    }
  };

  public deleteLeaveById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.leaveService.deleteLeave(id);

      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("leave delete successfully")
        .send(res);
    } catch (err) {
      res.status(err.status);
      res.json({
        error: {
          message: err.message,
        },
      });
    }
  };
}

export default LeaveController;
