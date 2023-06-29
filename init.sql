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

INSERT INTO users(nickname, password, first_name, last_name)
VALUES('fstk1337', 'hahaha1337R#', 'Vitali', 'Shvaichuk');

INSERT INTO posts(title, date, content, user_id)
VALUES('The very first post.', CURRENT_TIMESTAMP, 'I wrote this just to check it out. Please believe.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));

INSERT INTO posts(title, date, content, user_id)
VALUES('Yet another beautiful post.', CURRENT_TIMESTAMP, 'What Ive felt, what Ive known, never shine in what I ve shown.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));
