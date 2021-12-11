import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPostsTable1639240852007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    generationStrategy: "rowid",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar(75)",
                    isNullable: false
                },
                {
                    name: "body",
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
        await queryRunner.dropTable("posts")
    }

}
