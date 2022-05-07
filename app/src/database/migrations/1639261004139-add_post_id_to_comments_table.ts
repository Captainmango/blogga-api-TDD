import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPostIdToCommentsTable1639261004139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('comments', new TableColumn({
                name: 'post_id',
                type: 'integer',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('comments', 'post_id')
    }

}
