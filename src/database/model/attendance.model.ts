import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.model";

@Entity("attendance")
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  public attendanceID: string;

  @Column()
  public timeIn: string;

  @Column()
  public timeOut: string;

  @Column()
  public employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee.attendance)
  public employee: Employee;

  @Column()
  public createdAt: string;

  @Column()
  public updatedAt: string;
}
