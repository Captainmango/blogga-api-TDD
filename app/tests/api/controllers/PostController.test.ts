import request from 'supertest'
import { Express } from 'express-serve-static-core'
import 'reflect-metadata'
import { createServer } from '../../../src/utils/server'
import { getCustomRepository } from 'typeorm'
import { factory, runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding'
import connection, { dbEnvs } from '../../../src/utils/db'
import { Post } from '../../../src/database/entities/Post'
import { PostRepository } from '../../../src/api/repositories/PostRepository'

let server: Express

beforeAll(async () => {
    await connection.createAll()
    connection.get(dbEnvs.test)    
    server = await createServer()
    await useSeeding()
})
  
afterAll(async () => {
    await tearDownDatabase()
    await connection.close(dbEnvs.test)
})

beforeEach(async () => {
    await connection.clear(dbEnvs.test)
})

/** Example test for a generic home route */
it("GET / has an index route", async () => {
    const res = await request(server).get("/")
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('message');
})

describe("POSTS API ENDPOINTS", () => {

    it("GET /posts has an index route", async () => {
        const posts: Post[] = await factory(Post)().createMany(2)
        const res = await request(server).get("/posts")
        expect(res.ok)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body.posts[0].title).toBe(posts[0].title)
        expect(res.body.posts).toHaveLength(2)
    })

    it("GET /posts/{post_id} is able to retrieve a single post", async () => {
        const post: Post = await factory(Post)().create()
        const res = await request(server).get(`/posts/${post.id}`)
        expect(res.ok)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toMatchObject(post)
    })

    it("GET /posts/{post_id} returns 404 if there is no post at the id", async () => {
        const res = await request(server).get("/posts/2003")
        expect(res.notFound)
        expect(res.type).toEqual(expect.stringContaining('json'))
    })

    it("PATCH /posts/{post_id} is able to update a post", async () => {
        const post: Post[] = await factory(Post)().createMany(4)
        const res = await request(server)
            .patch(`/posts/${post[2].id}`)
            .send({
                title: "This is the new title",
                body: "This is the body of the post"
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject(post[2])
    })

    it("PATCH /posts/{post_id} returns resource not found if there is no post at the id", async () => {
        const res = await request(server).patch("/posts/2003").send({
            title: "This is the new title",
            body: "This is the body of the post"
        })
        expect(res.notFound)
        expect(res.type).toEqual(expect.stringContaining('json'))
    })

    it("DELETE /posts/{post_id} is able to delete a posts", async () => {
        const post: Post[] = await factory(Post)().createMany(4)
        const postRepository = getCustomRepository(PostRepository)
        const postToDelete = await postRepository.findOneOrFail(post[3].id)
        const res = await request(server).delete(`/posts/${postToDelete.id}`)
        
        expect(res.status).toBe(204)
    })

    it("DELETE /posts/{post_id} returns 404 if post doesn't exist", async () => {
        const post: Post[] = await factory(Post)().createMany(4)
        const postRepository = getCustomRepository(PostRepository)
        const postToDelete = await postRepository.findOneOrFail(post[3].id)
        const res = await request(server).delete(`/posts/${postToDelete.id}`)

        expect(res.notFound)
    })

    it("POST /posts is able to create a new post", async () => {
        const res = await request(server).post("/posts")
            .send({
                title: "My awesome new post",
                body: "Some lorem I guess?"
            })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("title")
        expect(res.body.title).toBe("My awesome new post")
    })
})

