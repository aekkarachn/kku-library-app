-- PostgreSQL Script for Supabase

CREATE SCHEMA IF NOT EXISTS app;

-- Drop table if exists
-- DROP TABLE IF EXISTS Books;

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
CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.users (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  name           TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert Sample Data
INSERT INTO app.books (title, author, price, published_at)
VALUES 
('Node.js in Action', 'Mike Cantelon', 39.99, '2017-09-29'),
('Clean Code', 'Robert C. Martin', 45.00, '2008-08-01'),
('The Pragmatic Programmer', 'Andrew Hunt', 42.50, '1999-10-30')
ON CONFLICT DO NOTHING;
