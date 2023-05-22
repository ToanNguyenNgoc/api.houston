import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewCustomer1678941757380 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
