import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class demoIndex1674470779388 implements MigrationInterface {
  private readonly tableName = "demo_index";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "demoId",
            type: "int",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: "demoName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "demoDate",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "demoDescription",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "demoId_index",
        columnNames: ["demoId"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "demoName_index",
        columnNames: ["demoName"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "demoDate_index",
        columnNames: ["demoDate"],
      }),
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "demoDescription_index",
        columnNames: ["demoDescription"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
