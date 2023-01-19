import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.model";

@Entity("users")
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

  @Column()
  public createdAt: string;

  @Column()
  public updatedAt: string;
}
