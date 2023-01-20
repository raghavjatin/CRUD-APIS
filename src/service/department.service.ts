import { IJobDepartment } from "@type/department";
import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { Department } from "../database/model/department.model";
import { DepartmentRepo } from "../database/repository/department.repository";

@Service()
export class DepartmentService {
  // fetch all job title details
  public async findDepartments(): Promise<IJobDepartment[]> {
    try {
      const departmentRepo = getManager().getCustomRepository(DepartmentRepo);
      const dep = await departmentRepo.find();

      const departmentArray = (dep || []).map((department: IJobDepartment) => ({
        departmentId: department.departmentId,
        departmentName: department.departmentName,
      }));
      return departmentArray || [];
    } catch (err) {
      throw new createHttpError.BadRequest("something wrong");
    }
  }

  // create Job Title
  public async createDepartment(dep: Department): Promise<IJobDepartment> {
    try {
      const departmentRepo = getManager().getCustomRepository(DepartmentRepo);
      const result = await departmentRepo.save(dep);
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // update Department
  public async updateDepartment(dep: Department, departmentId: string): Promise<IJobDepartment> {
    try {
      const departmentRepo = getManager().getCustomRepository(DepartmentRepo);
      const result = await departmentRepo.findOne({ where: { departmentId } });
      return departmentRepo.save({
        ...result, // existing fields
        ...dep, // updated fields
      });
    } catch (err) {
      throw new createHttpError.NotFound("Department Id invalid");
    }
  }

  // delete Department by id
  public async deleteDepartment(departmentId: string): Promise<IJobDepartment> {
    try {
      const departmentRepo = getManager().getCustomRepository(DepartmentRepo);
      const result = await departmentRepo.findOne({ where: { departmentId } });
      const deletedDepartment = await departmentRepo.remove(result);

      return deletedDepartment;
    } catch (err) {
      throw new createHttpError.NotFound("Department Id invalid");
    }
  }
}
