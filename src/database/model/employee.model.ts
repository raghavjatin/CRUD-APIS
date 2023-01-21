import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
  public mobileNumber: number;

  @Column()
  public hireDate: Date;

  @Column()
  public jobTitle: string;

  @Column()
  public jobTitleId: string;

  @Column()
  public departmentId: string;

  @ManyToOne(() => Department)
  @JoinColumn({ name: "department_id" })
  public department: Department;

  // @ManyToOne(() => Department, (department) => department.employee)
  // @JoinColumn()
  // public department: Department;

  // @OneToMany(() => Attendance, (attendance) => attendance.employee)
  // @JoinColumn()
  // public attendance: Attendance[];

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  public attendance: Attendance[];

  // @ManyToOne(() => Jobtitle, (jobtitle) => jobtitle.employee)
  // @JoinColumn()
  // public jobtitle: Jobtitle;

  @ManyToOne(() => Jobtitle)
  @JoinColumn({ name: "job_title_id" })
  public jobtitle: Jobtitle;

  // @OneToMany(() => Leave, (leave) => leave.employee)
  // @JoinColumn()
  // public leave: Leave[];

  @OneToMany(() => Leave, (leave) => leave.employee)
  public leave: Leave[];

  @CreateDateColumn({
    select: true,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: true,
  })
  public updatedAt: Date;
}
