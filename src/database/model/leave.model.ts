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

@Entity("leave")
export class Leave {
  @PrimaryGeneratedColumn("uuid")
  public leaveId: string;

  @Column()
  public employeeId: string;

  @Column()
  public fromDate: Date;

  @Column()
  public toDate: Date;

  @Column()
  public reason: string;

  // @ManyToOne(() => Employee, (employee) => employee.leave)
  // public employee: Employee;

  @ManyToOne(() => Employee, (employee) => employee.leave)
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
