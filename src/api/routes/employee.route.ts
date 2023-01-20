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
    // this.router.get("/", this.employeeController.findEmployees);
    this.router.post(
      "/",
      this.httpRequestValidator.validate("body", employee),
      this.employeeController.createEmployee,
    );
    // this.router.put(
    //   "/:id",
    //   this.httpRequestValidator.validate("body", employee),
    //   this.employeeController.updateEmployeeDetails,
    // );
    // this.router.delete("/:id", this.employeeController.deleteEmployeeById);
  }
}

export default new Employee().router;
