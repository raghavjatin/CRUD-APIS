import express from "express";
import Container from "typedi";
import { department } from "../validator/department";
import DepartmentController from "../controller/department.controller";
import HttpRequestValidator from "../../middleware/http-request-validator";

class Department {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly departmentController: DepartmentController;

  constructor() {
    this.departmentController = Container.get(DepartmentController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.departmentController.findAllDepartments);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", department),
      this.departmentController.createNewDepartment,
    );
    this.router.put(
      "/:id",
      this.httpRequestValidator.validate("body", department),
      this.departmentController.updateDepartmentDetails,
    );
    this.router.delete("/:id", this.departmentController.deleteDepartmentById);
  }
}

export default new Department().router;
