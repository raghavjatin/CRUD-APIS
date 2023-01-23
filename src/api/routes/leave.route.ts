import express from "express";
import Container from "typedi";
import { leave } from "../validator/leave";
import HttpRequestValidator from "../../middleware/http-request-validator";
import LeaveController from "../controller/leave.controller";

class Leave {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly leaveController: LeaveController;

  constructor() {
    this.leaveController = Container.get(LeaveController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.leaveController.findLeaves);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", leave),
      this.leaveController.createLeave,
    );
    this.router.put(
      "/:id",
      this.httpRequestValidator.validate("body", leave),
      this.leaveController.updateLeave,
    );

    this.router.delete("/:id", this.leaveController.deleteLeaveById);
  }
}

export default new Leave().router;
