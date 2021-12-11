import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../../database/entities/Comment";

@EntityRepository()
export class CommentRepository extends Repository<Comment>{

}