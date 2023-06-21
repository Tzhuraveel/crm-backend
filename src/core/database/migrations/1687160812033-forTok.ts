import { MigrationInterface, QueryRunner } from 'typeorm';

export class ForTok1687160812033 implements MigrationInterface {
  name = 'ForTok1687160812033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action_token\` CHANGE \`typeToken\` \`typeToken\` enum ('activate', 'forgot') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`action_token\` CHANGE \`typeToken\` \`typeToken\` enum ('activate') NOT NULL`,
    );
  }
}
