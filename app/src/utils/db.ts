import {createConnection, createConnections, getConnection} from 'typeorm';

export enum dbEnvs {
  dev = "default",
  test = "test"
}

const connection = {
  async create(){
    await createConnection()
  },

  async createAll(){
      await createConnections()
  },

  get(env: dbEnvs){
    getConnection(env)
  },

  async close(env: dbEnvs){
    await getConnection(env).close() 
  },

  async clear(env: dbEnvs){
    const connection = getConnection()
    const entities = connection.entityMetadatas

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  },
}
export default connection;