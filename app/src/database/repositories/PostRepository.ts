import { EntityRepository } from '@mikro-orm/sqlite';
import { Post } from "@entities/Post";

export class PostRepository extends EntityRepository<Post>
{
    //
}
