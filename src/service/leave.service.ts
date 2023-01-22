import createHttpError from "http-errors";
import { Service } from "typedi";
import { getManager } from "typeorm";
import { ILeave } from "../type/leave";
import { LeaveRepo } from "../database/repository/leave.repository";
import { Leave } from "../database/model/leave.model";

@Service()
export class LeaveService {
  // fetch all leave details
  public async findAllLeaves(): Promise<ILeave[]> {
    try {
      const leaveRepository = getManager().getCustomRepository(LeaveRepo);
      const empLeaves = await leaveRepository.find();

      const leavesArray = (empLeaves || []).map((leave: ILeave) => ({
        leaveId: leave.leaveId,
        employeeId: leave.employeeId,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        reason: leave.reason,
      }));
      return leavesArray || [];
    } catch (err) {
      throw new createHttpError.BadRequest("something wrong");
    }
  }

  // create leave
  public async createLeave(leave: Leave): Promise<ILeave> {
    try {
      const leaveRepository = getManager().getCustomRepository(LeaveRepo);
      const newLeave = await leaveRepository.save(leave);
      return newLeave;
    } catch (err) {
      throw new createHttpError.BadRequest("something went wrong");
    }
  }

  // update Leave
  public async updateLeave(leave: Leave, leaveId: string): Promise<ILeave> {
    try {
      const leaveRepository = getManager().getCustomRepository(LeaveRepo);
      const existingLeave = await leaveRepository.findOne({
        where: { leaveId },
      });
      return leaveRepository.save({
        ...existingLeave, // existing fields
        ...leave, // updated fields
      });
    } catch (err) {
      throw new createHttpError.NotFound("Leave Id invalid");
    }
  }

  // delete Leave by id
  public async deleteLeave(leaveId: string): Promise<ILeave> {
    try {
      const leaveRepository = getManager().getCustomRepository(LeaveRepo);
      const result = await leaveRepository.findOne({ where: { leaveId } });
      const deletedLeave = await leaveRepository.remove(result);

      return deletedLeave;
    } catch (err) {
      throw new createHttpError.NotFound("Leave Id invalid");
    }
  }
}
