import { Migration } from '@mikro-orm/migrations';

export class Migration20231223142411 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table `posts` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null, `body` text not null);');

    this.addSql('create table `comments` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `email_address` text not null, `content` text not null, `post_id` integer not null, constraint `comments_post_id_foreign` foreign key(`post_id`) references `posts`(`id`) on update cascade);');
    this.addSql('create index `comments_post_id_index` on `comments` (`post_id`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table `posts`')
    this.addSql('drop table `comments`')
  }
}
