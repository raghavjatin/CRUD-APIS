import { Department } from "@database/model/department.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Department)
export class ProductRepo extends Repository<Department> {}
