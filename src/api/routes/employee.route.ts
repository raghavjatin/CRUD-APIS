import express from "express";
import Container from "typedi";
import { employee } from "../validator/employee";
import EmployeeController from "../controller/employee.controller";
import HttpRequestValidator from "../../middleware/http-request-validator";

class Employee {
  public router: express.Router = express.Router();
  private httpRequestValidator: HttpRequestValidator;

  public readonly employeeController: EmployeeController;

  constructor() {
    this.employeeController = Container.get(EmployeeController);
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.employeeController.findEmployeeDetailsWithJobTitleAndDepartment);
    this.router.get(
      "/:id",
      this.employeeController.findEmployeeDetailsWithJobTitleAndDepartmentById,
    );

    this.router.get("/attendance/:id", this.employeeController.findEmployeeAttendanceById);
    this.router.get("/leave/:id", this.employeeController.findEmployeeLeavesAttendanceById);

    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", employee),
      this.employeeController.createEmployee,
    );
  }
}

export default new Employee().router;
