import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { IAttendance } from "../type/attendance";
import { AttendanceRepo } from "../database/repository/attendance.repository";
import { Attendance } from "../database/model/attendance.model";

@Service()
export class AttendanceService {
  // fetch all Attendance details
  public async findAllAttendance(): Promise<IAttendance[]> {
    try {
      const attendanceRepository = getManager().getCustomRepository(AttendanceRepo);
      const result = await attendanceRepository.find();

      const attendanceArray = (result || []).map((attendance: IAttendance) => ({
        attendanceId: attendance.attendanceId,
        employeeId: attendance.employeeId,
        timeIn: attendance.timeIn,
        timeOut: attendance.timeOut,
      }));
      return attendanceArray || [];
    } catch (err) {
      throw new createHttpError.BadRequest("something wrong");
    }
  }

  // create Attendance
  public async createAttendance(attendance: Attendance): Promise<IAttendance> {
    try {
      const attendanceRepository = getManager().getCustomRepository(AttendanceRepo);
      const result = await attendanceRepository.save(attendance);
      return result;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // update Attendance
  public async updateAttendance(
    attendance: Attendance,
    attendanceId: string,
  ): Promise<IAttendance> {
    try {
      const attendanceRepository = getManager().getCustomRepository(AttendanceRepo);
      const existingAttendance = await attendanceRepository.findOne({
        where: { attendanceId },
      });
      return attendanceRepository.save({
        ...existingAttendance, // existing fields
        ...attendance, // updated fields
      });
    } catch (err) {
      throw new createHttpError.NotFound("Attendance Id invalid");
    }
  }

  // delete Attendance by id
  public async deleteAttendance(attendanceId: string): Promise<IAttendance> {
    try {
      const attendanceRepository = getManager().getCustomRepository(AttendanceRepo);
      const result = await attendanceRepository.findOne({ where: { attendanceId } });
      const deletedAttendance = await attendanceRepository.remove(result);

      return deletedAttendance;
    } catch (err) {
      throw new createHttpError.NotFound("Attendance Id invalid");
    }
  }
}
