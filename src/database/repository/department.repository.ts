import { EntityRepository, Repository } from "typeorm";
import { Department } from "../model/department.model";

@EntityRepository(Department)
export class DepartmentRepo extends Repository<Department> {}
