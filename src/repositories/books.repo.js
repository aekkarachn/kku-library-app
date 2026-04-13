const env = require('../config/env');
const db = require('../db/pool');

class BooksRepository {
    async getAll() {
        const result = await db.query(`SELECT * FROM ${env.dbSchema}.books ORDER BY id ASC`);
        return result.rows;
    }

    async getById(id) {
        const result = await db.query(`SELECT * FROM ${env.dbSchema}.books WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async create(book) {
        const query = `
            INSERT INTO ${env.dbSchema}.books (title, author, price) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const values = [book.title, book.author, book.price];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async update(id, book) {
        const query = `
            UPDATE ${env.dbSchema}.books 
            SET title = $1, author = $2, price = $3, updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `;
        const values = [book.title, book.author, book.price, id];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = `DELETE FROM ${env.dbSchema}.books WHERE id = $1 RETURNING *`;
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new BooksRepository();
