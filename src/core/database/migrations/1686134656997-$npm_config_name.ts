import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1686134656997 implements MigrationInterface {
  name = ' $npmConfigName1686134656997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`updatedAt\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
