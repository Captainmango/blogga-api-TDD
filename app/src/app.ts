import { createServer } from './utils/server'
import http from 'http'
import 'reflect-metadata'
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';

export const Deps = {} as {
  server: http.Server,
  orm: MikroORM,
  em: EntityManager,
}

export const init = (async () => {
  Deps.orm = await MikroORM.init()
  Deps.em = Deps.orm.em

  const server = await createServer()

  server.use((req, res, next) => RequestContext.create(Deps.orm.em, next))

  Deps.server = server.listen(3000, () => {
    console.info(`Listening on http://localhost:3000`)
  })
})()

