import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendance } from "./attendance.model";
import { Department } from "./department.model";
import { Jobtitle } from "./jobtitle.model";
import { Leave } from "./leave.model";

@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  public employeeId: string;

  @Column({ unique: false })
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public gender: string;

  @Column()
  public mobileNumber: string;

  @Column()
  public hireDate: string;

  @Column()
  public jobTitle: string;

  @Column()
  public jobTitleID: string;

  @Column()
  public departmentId: string;

  // @OneToOne(() => Department)
  // @JoinColumn({ name: "departmentId" })
  // public department: Department;

  @ManyToOne(() => Department, (department) => department.employee)
  @JoinColumn()
  public department: Department;

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  @JoinColumn()
  public attendance: Attendance[];

  @ManyToOne(() => Jobtitle, (jobtitle) => jobtitle.employee)
  @JoinColumn()
  public jobtitle: Jobtitle;

  @OneToMany(() => Leave, (leave) => leave.employee)
  @JoinColumn()
  public leave: Leave[];

  @Column()
  public createdAt: string;

  @Column()
  public updatedAt: string;
}
