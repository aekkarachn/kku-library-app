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
            INSERT INTO ${env.dbSchema}.books (isbn, title, author, category) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const values = [book.isbn, book.title, book.author, book.category];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    async update(id, book) {
        const query = `
            UPDATE ${env.dbSchema}.books 
            SET isbn = $1, title = $2, author = $3, category = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [book.isbn, book.title, book.author, book.category, id];
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
