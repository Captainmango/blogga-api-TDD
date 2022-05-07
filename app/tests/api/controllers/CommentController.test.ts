import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { Comment } from '../../../src/database/entities/Comment'
import { createServer } from '../../../src/utils/server'
import connection, { dbEnvs } from '../../../src/utils/db'
import { factory, tearDownDatabase, useSeeding } from 'typeorm-seeding'

let server: Express

beforeAll(async () => {
    await connection.createAll()
    connection.get(dbEnvs.dev)    
    server = await createServer()
    await useSeeding()
})
  
afterAll(async () => {
    await tearDownDatabase()
})

beforeEach(async () => {
    await connection.clear(dbEnvs.dev)
})

describe("COMMENTS API ENDPOINTS", () => {
    it("GET /comments has an index route", async () => {
        const comments: Comment[] = await factory(Comment)().createMany(4)
        const comment = comments[0]
        const {createdAt, updatedAt, ...expected} = comment

        const res = await request(server).get("/comments")

        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toMatchObject(expected)
    })

    it("GET /comments/{comment_id} is able to retrieve a single comment", async () => {
        const comment = await factory(Comment)().create()
        const {createdAt, updatedAt, ...expected} = comment

        const res = await request(server).get(`/comments/${comment.id}}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject(expected)
    })

    it("GET /comments/{comment_id} returns 404 if comment cannot be found", async () => {
        const res = await request(server).get("/comments/42")

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })

    it("DELETE /comments/{comment_id} is able to delete a comment", async () => {
        const comments: Comment[] = await factory(Comment)().createMany(3)
        const comment = comments[1]

        const res = await request(server).delete(`/comments/${comment.id}`)

        expect(res.statusCode).toEqual(204)
    })

    it("DELETE /comments/{comment_id} returns 404 if comment cannot be found", async () => {
        const res = await request(server).delete("/comments/42")

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})