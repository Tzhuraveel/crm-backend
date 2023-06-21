import { MigrationInterface, QueryRunner } from 'typeorm';

export class Banned1686992664998 implements MigrationInterface {
  name = 'Banned1686992664998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`is_banned\` tinyint NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_banned\``);
  }
}
