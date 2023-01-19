import { Attendance } from "@database/model/attendance.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Attendance)
export class ProductRepo extends Repository<Attendance> {}
