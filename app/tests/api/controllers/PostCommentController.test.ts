import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from '../../../src/utils/server'
import connection, { dbEnvs } from '../../../src/utils/db'
import { useSeeding, tearDownDatabase } from 'typeorm-seeding'

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

describe("NESTED ROUTES", () => {

    it.todo("PATCH /posts/{post_id}/comments/{comment_id} is able to update a post's comments")

    it.todo("PATCH /posts/{post_id}/comments/{comment_id} returns 404 if no post found")

    it.todo("PATCH /posts/{post_id}/comments/{comment_id} verifies that comment found belongs to post")

    it.todo("POST /posts/{post_id}/comments is able to create a new comment for a post")

    it.todo("POST /posts/{post_id}/comments returns 404 if post does not exist")
})