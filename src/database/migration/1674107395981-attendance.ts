import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class attendance1674107395981 implements MigrationInterface {
  private readonly tableName = "attendance";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "attendance_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "time_in",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "time_out",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "employee_id",
            type: "uuid",
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
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["employee_id"],
            referencedColumnNames: ["employee_id"],
            referencedTableName: "employee",
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
