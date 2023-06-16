import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserReg1686725623514 implements MigrationInterface {
  name = 'UserReg1686725623514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(60) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(60) NOT NULL`,
    );
  }
}
