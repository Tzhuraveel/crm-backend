import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1685972386895 implements MigrationInterface {
  name = 'Comment1685972386895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(250) NOT NULL, \`order\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_637cccda0da5f9b85da3f0b2bc8\` FOREIGN KEY (\`order\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_637cccda0da5f9b85da3f0b2bc8\``,
    );
    await queryRunner.query(`DROP TABLE \`comment\``);
  }
}
