import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from '../../src/utils/server'

let server: Express

beforeAll(async () => {
    server = await createServer()
})

describe("COMMENTS API ENDPOINTS", () => {
    it.todo("GET /comments has an index route")

    it.todo("GET /posts/{post_id} is able to retrieve a single post")

    it.todo("PATCH /posts/{post_id} is able to update a post")

    it.todo("DELETE /posts/{post_id} is able to delete a posts")

    it.todo("POST /posts is able to create a new post")
})