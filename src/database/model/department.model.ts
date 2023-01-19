import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.model";

@Entity("department")
export class Department {
  @PrimaryGeneratedColumn("uuid")
  public departmentId: string;

  @Column()
  public departmentName: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  public employee: Employee[];

  @Column()
  public createdAt: string;

  @Column()
  public updatedAt: string;
}
