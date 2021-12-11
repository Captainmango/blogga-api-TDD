import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCommentsTable1639260969501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    generationStrategy: "rowid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar(75)",
                    isNullable: false
                },
                {
                    name: "email_address",
                    type: "varchar(90)",
                    isNullable: false
                },
                {
                    name: "content",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "datetime",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments")
    }

}
