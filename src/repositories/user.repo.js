const env = require('../config/env');
const pool = require('../db/pool');

async function createUser({ email, name, passwordHash }) {
  const sql = `
    INSERT INTO ${env.dbSchema}.users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, role, status, created_at
  `;

  const result = await pool.query(sql, [email, name, passwordHash]);
  return result.rows[0];
}

async function findByEmail(email) {
  const sql = `
    SELECT id, email, name, role, status, password_hash
    FROM ${env.dbSchema}.users
    WHERE email = $1
    LIMIT 1
  `;
  const result = await pool.query(sql, [email]);
  return result.rows[0] || null;
}

module.exports = {
  createUser,
  findByEmail,
};