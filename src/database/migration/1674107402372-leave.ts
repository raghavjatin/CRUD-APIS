import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class leave1674107402372 implements MigrationInterface {
  private readonly tableName = "leave";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "leave_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "from_date",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "to_date",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "reason",
            type: "varchar",
            isNullable: false,
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
            name: "FK_employee_id",
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
