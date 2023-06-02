import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimeStamp1685631671821 implements MigrationInterface {
  name = 'TimeStamp1685631671821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`createdAte\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`token\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`token\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`group\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`createdAte\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
