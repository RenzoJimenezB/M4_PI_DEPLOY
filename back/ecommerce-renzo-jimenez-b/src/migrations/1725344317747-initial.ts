import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1725344317747 implements MigrationInterface {
    name = 'Initial1725344317747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "address" text NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_c1b469bc2ffb4a3117c9f8ebdd" UNIQUE ("order_id"), CONSTRAINT "PK_cf4437dc89cc45584aba8c340cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT 'https://images.com/default-image.jpg', "category_id" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails_products" ("orderdetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_2c8fd465f3686cf41291c7dc563" PRIMARY KEY ("orderdetailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_975b7c667abe071d03f9b9157a" ON "orderdetails_products" ("orderdetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ccb7d9d0d6fa80b47a94f9f2f" ON "orderdetails_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD CONSTRAINT "FK_c1b469bc2ffb4a3117c9f8ebdda" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" ADD CONSTRAINT "FK_975b7c667abe071d03f9b9157a4" FOREIGN KEY ("orderdetailsId") REFERENCES "orderdetails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" ADD CONSTRAINT "FK_5ccb7d9d0d6fa80b47a94f9f2f0" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetails_products" DROP CONSTRAINT "FK_5ccb7d9d0d6fa80b47a94f9f2f0"`);
        await queryRunner.query(`ALTER TABLE "orderdetails_products" DROP CONSTRAINT "FK_975b7c667abe071d03f9b9157a4"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP CONSTRAINT "FK_c1b469bc2ffb4a3117c9f8ebdda"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ccb7d9d0d6fa80b47a94f9f2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_975b7c667abe071d03f9b9157a"`);
        await queryRunner.query(`DROP TABLE "orderdetails_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orderdetails"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
