import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("demo_index")
export class Department {
  @PrimaryGeneratedColumn()
  public demoId: number;

  @Column()
  public demoName: string;

  @Column()
  public demoDate: Date;

  @Column()
  public demoDescription: string;

  @CreateDateColumn({
    select: true,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: true,
  })
  public updatedAt: Date;
}
