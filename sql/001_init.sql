-- PostgreSQL Script for Supabase

CREATE SCHEMA IF NOT EXISTS app;

-- Drop table if exists
-- DROP TABLE IF EXISTS Books;

-- Create Books Table
CREATE TABLE IF NOT EXISTS app.books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    published_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users Table
CREATE TABLE IF NOT EXISTS app.users (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'User',
  status       TEXT NOT NULL DEFAULT 'active',
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Borrows Table
CREATE TABLE IF NOT EXISTS app.borrows (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES app.users(id),
  book_id      BIGINT NOT NULL REFERENCES app.books(id),
  borrowed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_date     DATE NOT NULL,
  returned_at  TIMESTAMPTZ
);

-- Insert Sample users
INSERT INTO app.users (email, name, role, status, password_hash)
VALUES ('alice@example.com', 'Alice', 'User', 'Active', '$2a$10$abcdefghijklmnopqrstuv123456789012345678901234')
RETURNING id, email, created_at;

-- Insert Sample books
INSERT INTO app.books (isbn, title, author, category)
VALUES
  ('9780131103627', 'The C Programming Language', 'Kernighan & Ritchie', 'Computer Science'),
  ('9780201633610', 'Design Patterns', 'Gamma et al.', 'Computer Science')
RETURNING id, title;