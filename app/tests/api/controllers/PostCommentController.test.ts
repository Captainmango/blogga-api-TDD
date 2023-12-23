import request from 'supertest'
import { Post } from '@entities/Post'
import { Comment } from '@entities/Comment'
import { init, Deps } from '../../../src'
import { PostFactory } from 'app/src/database/factories/PostFactory'
import { CommentFactory } from 'app/src/database/factories/CommentFactory'

beforeAll(async () => {
    await init

    await Deps.orm.getMigrator().up()
    await Deps.orm.config.getDriver().reconnect()
    await Deps.orm.getSchemaGenerator().clearDatabase()
})

afterAll(async () => {
    await Deps.orm.close(true)
    Deps.server.close()
})

afterEach(async () => {
    await Deps.orm.getSchemaGenerator().clearDatabase()
})

beforeEach(async () => {
    Deps.em = Deps.orm.em.fork()
})

describe("NESTED ROUTES", () => {

    it("PATCH /posts/{post_id}/comments/{comment_id} is able to update a post's comments", async () => {
        const post: Post = await new PostFactory(Deps.em).createOne()
        const comment: Comment = await new CommentFactory(Deps.em).createOne({ post: post })

        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(Deps.server).patch(`/posts/${post.id}/comments/${comment.id}`)
            .send(payload)

        expect(res.statusCode).toEqual(202)
        expect(res.body).toMatchObject(payload)
    })

    it.todo("PATCH /posts/{post_id}/comments/{comment_id} returns 404 if no post found")

    it.todo("PATCH /posts/{post_id}/comments/{comment_id} verifies that comment found belongs to post")

    it.todo("POST /posts/{post_id}/comments is able to create a new comment for a post")

    it.todo("POST /posts/{post_id}/comments returns 404 if post does not exist")
})
