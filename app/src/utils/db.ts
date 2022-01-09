import { createConnection, createConnections, getConnection } from 'typeorm';

/**
 * db set up code and exposed API. TypeORM does a good job of this.
 * But I wanted the API to be more idiomatic so it was easier to comprehend
 */

export enum dbEnvs {
  dev = "default",
  test = "test"
}

const connection = {
  async create() {
    await createConnection()
  },

  async createAll() {
    await createConnections()
  },

  get(env: dbEnvs) {
    getConnection(env)
  },

  async close(env: dbEnvs) {
    await getConnection(env).close()
  },

  async clear(env: dbEnvs) {
    const connection = getConnection(env)
    const entities = connection.entityMetadatas

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  },
}
export default connection;