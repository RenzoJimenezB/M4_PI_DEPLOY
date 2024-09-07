import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPasswordLength1725740151900 implements MigrationInterface {
  name = 'UserPasswordLength1725740151900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(20)`,
    );
  }
}
