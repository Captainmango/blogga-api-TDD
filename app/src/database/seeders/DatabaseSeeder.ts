import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PostFactory } from '../factories/PostFactory';
import { CommentFactory } from '../factories/CommentFactory';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void>
  {
    new PostFactory(em).each(post => {
      post.comments.set(new CommentFactory(em).make(5))
    }).make(10)

    em.flush()
  }
}
