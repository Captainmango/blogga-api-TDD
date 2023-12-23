import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { Deps, init } from '../../../src'
import { Comment } from '@entities/Comment'


beforeAll(async () => {
    await init

    Deps.orm.config.set("debug", false)

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

describe("COMMENTS API ENDPOINTS", () => {
    it.todo("GET /comments has an index route")

    it.todo("GET /comments/{comment_id} is able to retrieve a single comment")

    it.todo("GET /comments/{comment_id} returns 404 if comment cannot be found")

    it.todo("DELETE /comments/{comment_id} is able to delete a comment")

    it.todo("DELETE /comments/{comment_id} returns 404 if comment cannot be found")
})