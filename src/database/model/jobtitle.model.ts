import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.model";

@Entity("job_title")
export class Jobtitle {
  @PrimaryGeneratedColumn("uuid")
  public jobTitleID: string;

  @Column()
  public jobTitleName: string;

  @Column()
  public jobDescription: string;

  @OneToMany(() => Employee, (employee) => employee.jobTitle)
  public employee: Employee[];

  @Column()
  public createdAt: string;

  @Column()
  public updatedAt: string;
}
