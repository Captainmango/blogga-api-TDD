import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../../database/entities/Comment";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{

}