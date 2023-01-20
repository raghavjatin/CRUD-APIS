import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./employee.model";

@Entity("department")
export class Department {
  @PrimaryGeneratedColumn("uuid")
  public departmentId: string;

  @Column()
  public departmentName: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  public employee: Employee[];

  @CreateDateColumn({
    select: true,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: true,
  })
  public updatedAt: Date;
}
