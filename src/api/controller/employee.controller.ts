import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import constant from "../../config/constant";
import { ResponseParser } from "../../util/response-parser";
import { EmployeeService } from "../../service/employee.service";

@Service()
class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly responseParser: ResponseParser,
  ) {
    this.employeeService = new EmployeeService();
  }

  public findEmployeeDetailsWithJobTitleAndDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const result = await this.employeeService.getEmployeeTitleAndDepartment();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("employee found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };
  public findEmployeeDetailsWithJobTitleAndDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.employeeService.getEmployeeTitleAndDepartmentByID(id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("employee found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public findEmployeeAttendanceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.employeeService.getEmployeeAttendanceByID(id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("employee attendance found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public findEmployeeLeavesAttendanceById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.employeeService.getEmployeeLeaveAttendanceByID(id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("employee leaves and attendance found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const result = await this.employeeService.createEmployee(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("employee created successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
