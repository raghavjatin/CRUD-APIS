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

  // public findEmployees = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response> => {
  //   try {
  //     const result = await this.employeeService.findEmployee();
  //     return this.responseParser
  //       .setHttpCode(constant.HTTP_STATUS_OK)
  //       .setBody(result)
  //       .setMessage("employee found successfully")
  //       .send(res);
  //   } catch (err) {
  //     next(err);
  //   }
  // };

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

  // public updateEmployeeDetails = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const data = req.body;
  //     const {
  //       params: { id },
  //     } = req;
  //     const result = await this.employeeService.updateEmployee(data, id);
  //     return this.responseParser
  //       .setHttpCode(constant.HTTP_STATUS_OK)
  //       .setBody(result)
  //       .setMessage("update employee successfully")
  //       .send(res);
  //   } catch (err) {
  //     res.status(err.status);
  //     res.json({
  //       error: {
  //         message: err.message,
  //       },
  //     });
  //   }
  // };

  // public deleteEmployeeById = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const {
  //       params: { id },
  //     } = req;
  //     const result = await this.employeeService.deleteEmployee(id);

  //     return this.responseParser
  //       .setHttpCode(constant.HTTP_STATUS_OK)
  //       .setBody(result)
  //       .setMessage("employee delete successfully")
  //       .send(res);
  //   } catch (err) {
  //     res.status(err.status);
  //     res.json({
  //       error: {
  //         message: err.message,
  //       },
  //     });
  //   }
  // };
}

export default EmployeeController;
