import { EntityRepository, Repository } from "typeorm";
import { Attendance } from "../model/attendance.model";

@EntityRepository(Attendance)
export class AttendanceRepo extends Repository<Attendance> {}
