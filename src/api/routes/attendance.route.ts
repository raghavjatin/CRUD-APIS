import express from "express";
import Container from "typedi";
import HttpRequestValidator from "../../middleware/http-request-validator";
import { attendance } from "../validator/attendance";
import AttendanceController from "../controller/attendance.controller";

class AttendanceRoute {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly attendanceController: AttendanceController;

  constructor() {
    this.attendanceController = Container.get(AttendanceController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.attendanceController.findAttendance);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", attendance),
      this.attendanceController.createAttendance,
    );
    this.router.put(
      "/:id",
      this.httpRequestValidator.validate("body", attendance),
      this.attendanceController.updateAttendance,
    );

    this.router.delete("/:id", this.attendanceController.deleteAttendanceById);
  }
}

export default new AttendanceRoute().router;
