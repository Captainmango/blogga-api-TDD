import { EntityRepository } from '@mikro-orm/sqlite';
import { Comment } from "@entities/Comment";

export class CommentRepository extends EntityRepository<Comment>
{
    //
}
