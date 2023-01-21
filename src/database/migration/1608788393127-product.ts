import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class product1608788393127 implements MigrationInterface {
  private readonly tableName = "products";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "product_name",
            type: "varchar",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "quantity",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "price",
            type: "integer",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
