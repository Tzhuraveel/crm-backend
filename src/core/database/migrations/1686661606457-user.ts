import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1686661606457 implements MigrationInterface {
  name = 'User1686661606457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`is_active\` tinyint NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`last_login\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_login\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_active\``);
  }
}
