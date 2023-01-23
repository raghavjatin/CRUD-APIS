import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class alterEmployeeTable1674470276136 implements MigrationInterface {
  private readonly tableName = "employee";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "first_name_index",
        columnNames: ["first_name"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "last_name_index",
        columnNames: ["last_name"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "job_title_id_index",
        columnNames: ["job_title_id"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "department_id_index",
        columnNames: ["department_id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, "first_name_index");
    await queryRunner.dropIndex(this.tableName, "last_name_index");
    await queryRunner.dropIndex(this.tableName, "job_title_id_index");
    await queryRunner.dropIndex(this.tableName, "department_id_index");
  }
}
