import { MigrationInterface, QueryRunner } from 'typeorm';

export class Status1686043506913 implements MigrationInterface {
  name = 'Status1686043506913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`status\` \`status\` enum ('in work', 'new', 'agree', 'disagree', 'dubbing') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`status\` \`status\` enum ('In work', 'New', 'Agree', 'Disagree') NULL`,
    );
  }
}
