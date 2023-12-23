import { createServer } from './utils/server'
import http from 'http'
import 'reflect-metadata'
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';

export const Deps = {} as {
  server: http.Server,
  orm: MikroORM,
  em: EntityManager,
}

export const init = (async () => {
  Deps.orm = await MikroORM.init()
  Deps.em = Deps.orm.em
  
  const server = await createServer()

  Deps.server = server.listen(3000, () => {
    console.info(`Listening on http://localhost:3000`)
  })
})()

