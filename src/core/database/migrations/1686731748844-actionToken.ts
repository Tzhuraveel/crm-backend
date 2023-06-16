import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActionToken1686731748844 implements MigrationInterface {
  name = 'ActionToken1686731748844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`action_token\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`actionToken\` varchar(255) NOT NULL, \`typeToken\` enum ('activate') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`action_token\``);
  }
}
