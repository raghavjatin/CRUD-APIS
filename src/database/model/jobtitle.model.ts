import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./employee.model";

@Entity("job_title")
export class Jobtitle {
  @PrimaryGeneratedColumn("uuid")
  public jobTitleId: string;

  @Column()
  public jobTitleName: string;

  @Column()
  public jobDescription: string;

  @OneToMany(() => Employee, (employee) => employee.jobTitle)
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
