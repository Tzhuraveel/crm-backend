import { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1685969815811 implements MigrationInterface {
  name = 'Update1685969815811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_format\` enum ('static', 'online') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_format\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_type\``,
    );
  }
}
