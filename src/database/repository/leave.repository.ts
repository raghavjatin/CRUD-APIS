import { Leave } from "@database/model/leave.model";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Leave)
export class LeaveRepo extends Repository<Leave> {}
