import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewEntities1687537571068 implements MigrationInterface {
  name = 'NewEntities1687537571068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`action_token\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`actionToken\` varchar(255) NOT NULL, \`typeToken\` enum ('activate', 'forgot') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_8a45300fd825918f3b40195fbd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(60) NULL, \`is_active\` tinyint NULL DEFAULT 0, \`last_login\` timestamp NULL, \`role\` enum ('admin', 'manager') NOT NULL, \`name\` varchar(100) NOT NULL, \`is_banned\` tinyint NULL DEFAULT 0, \`surname\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(250) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`orderId\` bigint NULL, \`manager\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`token\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`accessToken\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a47ea758805ce622a5a4dae9f95\` FOREIGN KEY (\`manager\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c2344b0fe553895e42e7cd0a9c8\` FOREIGN KEY (\`group\`) REFERENCES \`group\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_1cf8eeba04f83aefd9c76714622\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_18b6489bc0a772e343d51c04301\` FOREIGN KEY (\`manager\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_18b6489bc0a772e343d51c04301\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_1cf8eeba04f83aefd9c76714622\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c2344b0fe553895e42e7cd0a9c8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a47ea758805ce622a5a4dae9f95\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager\``);
    await queryRunner.query(`DROP TABLE \`token\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8a45300fd825918f3b40195fbd\` ON \`group\``,
    );
    await queryRunner.query(`DROP TABLE \`group\``);
    await queryRunner.query(`DROP TABLE \`action_token\``);
  }
}
