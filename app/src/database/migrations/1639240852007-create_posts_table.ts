import {MigrationInterface, QueryRunner, Table} from "typeorm";

/**
 * These dirty things are the migrations. Not a fan of these really but they work.
 * These don't actually need to exist, but are here as a convenience incase you want to migrate and seed the db
 * No need to mess with these.
 */

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
