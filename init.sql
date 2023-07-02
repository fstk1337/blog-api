DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    date TIMESTAMPTZ,
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
