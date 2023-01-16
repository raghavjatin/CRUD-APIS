import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public productName: string;

  @Column()
  public quantity: string;

  @Column()
  public price: number;

  @Column({ nullable: false, type: "varchar", default: "test description" })
  public description: string;

  @CreateDateColumn({
    select: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false,
  })
  public updatedAt: Date;
}
