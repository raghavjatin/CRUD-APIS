import express from "express";
import Container from "typedi";
import { jobTitle } from "../validator/jobtitle";
import JobTitleController from "../controller/jobtitle.controller";
import HttpRequestValidator from "../../middleware/http-request-validator";

class JobTitle {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly jobTitleController: JobTitleController;

  constructor() {
    this.jobTitleController = Container.get(JobTitleController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.jobTitleController.findJobTitles);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", jobTitle),
      this.jobTitleController.createJobTitle,
    );
    this.router.put(
      "/:id",
      this.httpRequestValidator.validate("body", jobTitle),
      this.jobTitleController.updateJobTitleDetails,
    );

    this.router.delete("/:id", this.jobTitleController.deleteJobTitleById);
  }
}

export default new JobTitle().router;
