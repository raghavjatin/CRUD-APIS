import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./employee.model";

@Entity("attendance")
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  public attendanceId: string;

  @Column()
  public timeIn: Date;

  @Column()
  public timeOut: Date;

  @Column()
  public employeeId: string;

  // @ManyToOne(() => Employee, (employee) => employee.attendance)
  // public employee: Employee;

  @ManyToOne(() => Employee, (employee) => employee.employeeId)
  @JoinColumn({ name: "employee_id" })
  public employee: Employee;

  @CreateDateColumn({
    select: true,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: true,
  })
  public updatedAt: Date;
}
