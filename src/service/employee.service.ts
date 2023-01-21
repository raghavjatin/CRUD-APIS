import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { IEmployee } from "../type/employee";
import { EmployeeRepo } from "../database/repository/employee.repository";
import { Employee } from "../database/model/employee.model";

@Service()
export class EmployeeService {
  // fetch all job title details
  // public async findEmploye(): Promise<IEmployee[]> {
  //   try {
  //     const empRepository = getManager().getCustomRepository(EmployeeRepo);
  //     const employee = await empRepository.find();

  //     const empArray = (employee || []).map((emp: IEmployee) => ({
  //       employeeId: emp.employeeId,
  //       email: emp.email,
  //       firstName: emp.firstName,
  //       lastName: emp.lastName,
  //       gender: emp.gender,
  //       hireDate: emp.hireDate,
  //       mobileNumber: emp.mobileNumber,
  //     }));
  //     return empArray || [];
  //   } catch (err) {
  //     throw new createHttpError.BadRequest("something wrong");
  //   }
  // }

  // create Job Title
  public async createEmployee(employee: Employee): Promise<IEmployee> {
    try {
      const empRepository = getManager().getCustomRepository(EmployeeRepo);

      const newEmp = await empRepository.save(employee);
      return newEmp;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }
}
