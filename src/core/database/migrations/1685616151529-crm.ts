import { MigrationInterface, QueryRunner } from 'typeorm';

export class Crm1685616151529 implements MigrationInterface {
  name = 'Crm1685616151529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_format\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_format\` enum ('static', 'online') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` enum ('In work', 'New', 'Agree', 'Disagree') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_3f30dcd69f06f473c7bb510d11c\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8da0ad3c25c7ddebacae1e0d5cc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8da0ad3c25c7ddebacae1e0d5cc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_3f30dcd69f06f473c7bb510d11c\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_type\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_format\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_format\` varchar(15) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course\` varchar(10) NULL`,
    );
  }
}
