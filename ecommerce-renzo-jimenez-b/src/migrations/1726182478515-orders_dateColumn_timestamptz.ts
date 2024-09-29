import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersDateColumnTimestamptz1726182478515
  implements MigrationInterface
{
  name = 'OrdersDateColumnTimestamptz1726182478515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "date" TYPE TIMESTAMP WITH TIME ZONE 
      USING "date"::TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "date" TYPE DATE
        USING "date"::DATE`,
    );
  }
}
