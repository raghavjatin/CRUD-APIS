import {
  Column,
  CreateDateColumn,
  Entity,
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
  public fromDate: string;

  @Column()
  public toDate: string;

  @Column()
  public reason: string;

  @ManyToOne(() => Employee, (employee) => employee.leave)
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
