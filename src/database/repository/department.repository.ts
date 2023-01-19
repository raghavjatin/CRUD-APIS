import { Department } from "@database/model/department.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Department)
export class DepartmentRepo extends Repository<Department> {}
