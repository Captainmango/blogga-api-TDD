import request from 'supertest'
import { Express } from 'express-serve-static-core'

import { createServer } from '../../src/utils/server'

let server: Express

beforeAll(async () => {
    server = await createServer()
})

describe("NESTED ROUTES", () => {
    it.todo("GET /posts/{post_id}/comments is able to get all comments for a post")

    it.todo("PATCH /posts/{post_id}/comments is able to update a posts comments")

    it.todo("POST /posts/{post_id}/comments is able to create a new comment for a post")

    it.todo("GET /posts/{post_id}/comments/{comment_id} is able to get a specific comment for a specific post")

})