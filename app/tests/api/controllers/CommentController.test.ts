import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from '../../../src/utils/server'
import connection, { dbEnvs } from '../../../src/utils/db'
import { tearDownDatabase, useSeeding } from 'typeorm-seeding'

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

describe("COMMENTS API ENDPOINTS", () => {
    it.todo("GET /comments has an index route")

    it.todo("GET /comments/{comment_id} is able to retrieve a single post")

    it.todo("GET /comments/{comment_id} returns 404 if comment cannot be found")

    it.todo("PATCH /comments/{comment_id} is able to update a post")

    it.todo("PATCH /comments/{comment_id} returns 404 if comment cannot be found")

    it.todo("DELETE /comments/{comment_id} is able to delete a posts")

    it.todo("DELETE /comments/{comment_id} returns 404 if comment cannot be found")

    it.todo("POST /comments is able to create a new post")
})