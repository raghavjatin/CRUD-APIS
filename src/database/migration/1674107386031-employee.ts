import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class employee1674107386031 implements MigrationInterface {
  private readonly tableName = "employee";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "employee_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "mobile_number",
            type: "integer",
            isNullable: true,
          },
          {
            name: "hire_date",
            type: "timestamptz",
            isNullable: false,
            default: "now()",
          },
          {
            name: "job_title_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "department_id",
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
            name: "FK_job_title_id",
            referencedTableName: "job_title",
            columnNames: ["job_title_id"],
            referencedColumnNames: ["job_title_id"],
          }),
          new TableForeignKey({
            name: "FK_department_id",
            referencedTableName: "department",
            columnNames: ["department_id"],
            referencedColumnNames: ["department_id"],
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
