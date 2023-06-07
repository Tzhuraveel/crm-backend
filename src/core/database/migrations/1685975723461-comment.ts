import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1685975723461 implements MigrationInterface {
  name = 'Comment1685975723461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_637cccda0da5f9b85da3f0b2bc8\``,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`message\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`order\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`comment\` varchar(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`orderId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`managerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_1cf8eeba04f83aefd9c76714622\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_4c3a71c0cf85bea9bd1c10977f7\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_4c3a71c0cf85bea9bd1c10977f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_1cf8eeba04f83aefd9c76714622\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`managerId\``,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comment\``);
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`order\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`message\` varchar(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_637cccda0da5f9b85da3f0b2bc8\` FOREIGN KEY (\`order\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
