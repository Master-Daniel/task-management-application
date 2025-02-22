import { Migration } from '@mikro-orm/migrations';

export class Migration20250222181316 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`task\` (\`id\` int unsigned not null auto_increment primary key, \`description\` varchar(255) not null, \`status\` varchar(255) not null default 'active', \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`task\`;`);
  }

}
