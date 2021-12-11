import request from 'supertest'
import { Express } from 'express-serve-static-core'
import 'reflect-metadata'
import { createServer } from '../../src/utils/server'
import { createDatabase, env } from '../../src/utils/db'
import { Connection, getConnection, createConnection } from 'typeorm'
import { runSeeder, useRefreshDatabase, useSeeding } from 'typeorm-seeding'
import CreatePosts from '../../src/database/seeders/create-posts.seed'

let server: Express
let connection: Connection


beforeAll(async () => {
    connection = await createConnection("test")
    server = await createServer()
    await useSeeding()
})


it("GET / has an index route", async () => {
    const res = await request(server).get("/")
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('message');
})

describe("POSTS API ENDPOINTS", () => {

    it("GET /posts has an index route", async () => {
        const res = await request(server).get("/posts")
        expect(res.ok)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toHaveProperty('posts')
    })

    it.todo("GET /posts/{post_id} is able to retrieve a single post")

    it.todo("PATCH /posts/{post_id} is able to update a post")

    it.todo("DELETE /posts/{post_id} is able to delete a posts")

    it.todo("POST /posts is able to create a new post")
})

