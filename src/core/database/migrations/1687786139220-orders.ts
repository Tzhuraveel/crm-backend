import { MigrationInterface, QueryRunner } from 'typeorm';

export class Orders1687786139220 implements MigrationInterface {
  name = 'Orders1687786139220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_1cf8eeba04f83aefd9c76714622\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`orderId\``);
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`orderId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_1cf8eeba04f83aefd9c76714622\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_1cf8eeba04f83aefd9c76714622\``,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`orderId\` bigint NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_1cf8eeba04f83aefd9c76714622\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
