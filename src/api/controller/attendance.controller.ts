import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import constant from "../../config/constant";
import { ResponseParser } from "../../util/response-parser";
import { AttendanceService } from "../../service/attendance.service";

@Service()
class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly responseParser: ResponseParser,
  ) {
    this.attendanceService = new AttendanceService();
  }

  public findAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const attendance = await this.attendanceService.findAllAttendance();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(attendance)
        .setMessage("attendance found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const newAttendance = await this.attendanceService.createAttendance(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(newAttendance)
        .setMessage("attendance created successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const {
        params: { id },
      } = req;
      const updateAttendance = await this.attendanceService.updateAttendance(data, id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(updateAttendance)
        .setMessage("update attendance successfully")
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

  public deleteAttendanceById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.attendanceService.deleteAttendance(id);

      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("attendance delete successfully")
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

export default AttendanceController;
