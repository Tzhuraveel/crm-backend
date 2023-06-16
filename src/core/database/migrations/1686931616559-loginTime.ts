import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoginTime1686931616559 implements MigrationInterface {
  name = 'LoginTime1686931616559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_login\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`last_login\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_login\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`last_login\` date NULL`,
    );
  }
}
