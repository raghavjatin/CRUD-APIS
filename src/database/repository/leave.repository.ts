import { EntityRepository, Repository } from "typeorm";
import { Leave } from "../model/leave.model";

@EntityRepository(Leave)
export class LeaveRepo extends Repository<Leave> {}
