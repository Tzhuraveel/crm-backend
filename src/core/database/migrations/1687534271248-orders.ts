import { MigrationInterface, QueryRunner } from 'typeorm';

export class Orders1687534271248 implements MigrationInterface {
  name = 'Orders1687534271248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL`,
    );
  }
}
