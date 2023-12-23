import { Post } from '@entities/Post'
import { Comment } from '@entities/Comment'
import { defineConfig } from '@mikro-orm/sqlite'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default defineConfig({
    entities: [Post, Comment],
    dbName: "dev-database.db",
    highlighter: new SqlHighlighter(),
    debug: true,
    migrations: {
        tableName: "database_migrations",
        path: "./migrations",
        disableForeignKeys: true,
        allOrNothing: true,
        emit: 'ts',
    }
})
