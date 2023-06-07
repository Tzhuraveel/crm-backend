import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1686038621632 implements MigrationInterface {
  name = 'Comment1686038621632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_4c3a71c0cf85bea9bd1c10977f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`managerId\` \`manager\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_18b6489bc0a772e343d51c04301\` FOREIGN KEY (\`manager\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_18b6489bc0a772e343d51c04301\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`manager\` \`managerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_4c3a71c0cf85bea9bd1c10977f7\` FOREIGN KEY (\`managerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
