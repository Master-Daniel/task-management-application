/* eslint-disable @typescript-eslint/require-await */
import { Migration } from '@mikro-orm/migrations';

export class Migration20250221155507 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`task\` modify \`status\` varchar(255) not null default 'active';`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`task\` modify \`status\` varchar(255) not null default '\\'active\\'';`,
    );
  }
}
