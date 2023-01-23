import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { IEmployee } from "../type/employee";
import { EmployeeRepo } from "../database/repository/employee.repository";
import { Employee } from "../database/model/employee.model";

@Service()
export class EmployeeService {
  // create Employee
  public async createEmployee(employee: Employee): Promise<IEmployee> {
    try {
      const empRepository = getManager().getCustomRepository(EmployeeRepo);

      const newEmp = await empRepository.save(employee);
      return newEmp;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // Get Employee Details with job title and department
  public async getEmployeeTitleAndDepartment(): Promise<IEmployee[]> {
    try {
      const result = await getManager()
        .getCustomRepository(EmployeeRepo)
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.jobtitle", "jobtitle")
        .leftJoinAndSelect("employee.department", "department")
        .getMany();
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // Get Employee Details with job title and department By Id
  public async getEmployeeTitleAndDepartmentByID(id: string): Promise<IEmployee> {
    try {
      const result = await getManager()
        .getCustomRepository(EmployeeRepo)
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.jobtitle", "jobtitle")
        .leftJoinAndSelect("employee.department", "department")
        .where("employee.employeeId = :id", { id })
        .getOne();
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // Get Employee attendance by employee Id
  public async getEmployeeAttendanceByID(employeeId: string): Promise<IEmployee> {
    try {
      const result = await getManager()
        .getCustomRepository(EmployeeRepo)
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.attendance", "attendance")
        .where("attendance.employee = :employeeId", { employeeId })
        .getOne();
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // Get Employee leaves/attendance by employee Id
  public async getEmployeeLeaveAttendanceByID(employeeId: string): Promise<IEmployee> {
    try {
      const employeeRepository = getManager().getCustomRepository(EmployeeRepo);
      const result = await employeeRepository.findOne({
        relations: ["leave", "attendance"],
        where: { employeeId },
        select: ["employeeId", "firstName", "lastName", "email", "jobTitle"],
      });
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }
}
