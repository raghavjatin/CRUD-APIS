import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../model/employee.model";

@EntityRepository(Employee)
export class EmployeeRepo extends Repository<Employee> {}
