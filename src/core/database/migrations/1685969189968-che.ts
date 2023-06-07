import { MigrationInterface, QueryRunner } from 'typeorm';

export class Che1685969189968 implements MigrationInterface {
  name = 'Che1685969189968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`FK_3f30dcd69f06f473c7bb510d11c\` ON \`orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_8da0ad3c25c7ddebacae1e0d5cc\` ON \`orders\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`groupId\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`managerId\``);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD UNIQUE INDEX \`IDX_8a45300fd825918f3b40195fbd\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a47ea758805ce622a5a4dae9f95\` FOREIGN KEY (\`manager\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c2344b0fe553895e42e7cd0a9c8\` FOREIGN KEY (\`group\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c2344b0fe553895e42e7cd0a9c8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a47ea758805ce622a5a4dae9f95\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` DROP INDEX \`IDX_8a45300fd825918f3b40195fbd\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`managerId\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`groupId\` int NULL`);
    await queryRunner.query(
      `CREATE INDEX \`FK_8da0ad3c25c7ddebacae1e0d5cc\` ON \`orders\` (\`groupId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_3f30dcd69f06f473c7bb510d11c\` ON \`orders\` (\`managerId\`)`,
    );
  }
}
