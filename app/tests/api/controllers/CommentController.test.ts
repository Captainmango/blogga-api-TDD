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
    it.todo("GET /comments has an index route", async () => {
        const comments: Comment[] = await factory(Comment)().createMany(4)
        const comment = comments[0]
        const {createdAt, updatedAt, ...expected} = comment
    })

    it.todo("GET /comments/{comment_id} is able to retrieve a single comment")

    it.todo("GET /comments/{comment_id} returns 404 if comment cannot be found")

    it.todo("DELETE /comments/{comment_id} is able to delete a comment")

    it.todo("DELETE /comments/{comment_id} returns 404 if comment cannot be found")
})