import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAdmin1768497585476 implements MigrationInterface {
    name = 'InsertAdmin1768497585476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" ("name", "email", "phone", "password", "role")
            VALUES (
                'Admin User',
                'admin@mail.com',
                '1234567890',
                '$2b$10$zrjQLsfKBs.MpMLavjtDF.X/qQYslPYLzYRQ6I/icvjT.elnMGHkG',
                'ADMIN'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user" WHERE "email" = 'admin@mail.com';
        `);
    }
}
