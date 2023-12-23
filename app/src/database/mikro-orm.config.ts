import { Post } from '@entities/Post'
import { Comment } from '@entities/Comment'
import { defineConfig } from '@mikro-orm/sqlite'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
    entities: [Post, Comment],
    dbName: "test-database.db",
    highlighter: new SqlHighlighter(),
    debug: true,
    allowGlobalContext: true,
    migrations: {
        tableName: "database_migrations",
        path: "./app/src/database/migrations",
        disableForeignKeys: true,
        allOrNothing: true,
        emit: 'ts',
        snapshot: false,
    },
    seeder: {
        path: "./app/src/database/seeders",
        emit: 'ts',
    }
})
