import {EntityRepository, Repository} from "typeorm";
import { Post } from "../../database/entities/Post";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

}