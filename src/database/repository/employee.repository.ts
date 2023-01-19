import { Employee } from "@database/model/employee.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Employee)
export class EmployeeRepo extends Repository<Employee> {}
