import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddNewPermission1678942306746 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
