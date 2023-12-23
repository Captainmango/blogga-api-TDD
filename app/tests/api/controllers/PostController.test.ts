import request from 'supertest'
import { Express } from 'express-serve-static-core'
import 'reflect-metadata'
import { Post } from '@entities/Post'
import { Deps, init } from '../../../src/app'
import { PostFactory } from '../../../src/database/factories/PostFactory'

let server: Express

beforeAll(async () => {
    await init
    Deps.orm.config.set("dbName", "test-database.db")
    Deps.orm.config.set("debug", false)

    await Deps.orm.getMigrator().up()

    await Deps.orm.config.getDriver().reconnect()
    await Deps.orm.getSchemaGenerator().clearDatabase()
})

afterAll(async () => {
    await Deps.orm.close(true)
    Deps.server.close()
})

beforeEach(async () => {
    Deps.orm.getSchemaGenerator().clearDatabase()
})

/** Example test for a generic home route */
it("GET / has an index route", async () => {
    const res = await request(Deps.server).get("/")
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('message');
})

describe("POSTS API ENDPOINTS", () => {

    it("GET /posts has an index route", async () => {
        const posts: Post[] = await new PostFactory(Deps.em).create(2)
        const post = posts[0]
        const { createdAt, updatedAt, comments, ...expected } = post

        const res = await request(server).get("/posts")

        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body[0]).toMatchObject(expected)
    })

    it("GET /posts/{post_id} is able to retrieve a single post", async () => {
        const post: Post = await new PostFactory(Deps.em).createOne()
        const { createdAt, updatedAt, comments, ...expected } = post

        const res = await request(server).get(`/posts/${post.id}`)

        expect(res.statusCode).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toMatchObject(expected)
    })

    it("GET /posts/{post_id} returns 404 if there is no post at the id", async () => {
        const res = await request(server).get("/posts/2003")
        expect(res.statusCode).toEqual(404)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toHaveProperty('message')
    })

    it("PATCH /posts/{post_id} is able to update a post", async () => {
        const posts: Post[] = await new PostFactory(Deps.em).create(4)
        const post = posts[2]
        const payload = {
            title: "This is the new title",
            body: "This is the body of the post"
        }

        const res = await request(server)
            .patch(`/posts/${post.id}`)
            .send(payload)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(payload)
    })

    it("PATCH /posts/{post_id} returns resource not found if there is no post at the id", async () => {
        const payload = {
            title: "This is the new title",
            body: "This is the body of the post"
        }

        const res = await request(server).patch("/posts/2003").send(payload)

        expect(res.statusCode).toEqual(404)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toHaveProperty('message')
    })

    it("DELETE /posts/{post_id} is able to delete a post", async () => {
        const posts: Post[] = await new PostFactory(Deps.em).create(4)
        const post = posts[3]

        const res = await request(server).delete(`/posts/${post.id}`)

        expect(res.statusCode).toEqual(204)
    })

    it("DELETE /posts/{post_id} returns 404 if post doesn't exist", async () => {
        const res = await request(server).delete("/posts/2003")

        expect(res.statusCode).toEqual(404)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toHaveProperty('message')
    })

    it("POST /posts is able to create a new post", async () => {
        const payload = {
            title: "My awesome new post",
            body: "Some lorem I guess?"
        }

        const res = await request(server).post("/posts")
            .send(payload)

        expect(res.statusCode).toEqual(201)
        expect(res.body).toMatchObject(payload)
    })
})

