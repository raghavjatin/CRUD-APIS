import { DepartmentService } from "@service/department.service";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import constant from "../../config/constant";
import { ResponseParser } from "../../util/response-parser";

@Service()
class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly responseParser: ResponseParser,
  ) {
    this.departmentService = new DepartmentService();
  }

  public findAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const dep = await this.departmentService.findDepartments();
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(dep)
        .setMessage("all department found successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public createNewDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = req.body;
      const newDep = await this.departmentService.createDepartment(data);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(newDep)
        .setMessage("department created successfully")
        .send(res);
    } catch (err) {
      next(err);
    }
  };

  public updateDepartmentDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      const {
        params: { id },
      } = req;
      const updateDep = await this.departmentService.updateDepartment(data, id);
      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(updateDep)
        .setMessage("update department successfully")
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

  public deleteDepartmentById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        params: { id },
      } = req;
      const result = await this.departmentService.deleteDepartment(id);

      return this.responseParser
        .setHttpCode(constant.HTTP_STATUS_OK)
        .setBody(result)
        .setMessage("department delete successfully")
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

export default DepartmentController;
