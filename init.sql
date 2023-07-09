DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    nickname VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    date TIMESTAMPTZ,
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    post_id INTEGER,
    date TIMESTAMPTZ,
    text TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users(email, password, is_admin, nickname, first_name, last_name)
VALUES('vit.shvaichuk@gmail.com', '$2y$12$AN0LBoWXbn1q7cqvwb.Du.fbOEJMdpaopvWYFDYmCwB7SQsIQAaR2', TRUE, 'fstk1337', 'Vitali', 'Shvaichuk');

INSERT INTO posts(title, date, content, user_id)
VALUES('The very first post.', CURRENT_TIMESTAMP, 'I wrote this just to check it out. Please believe.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));

INSERT INTO posts(title, date, content, user_id)
VALUES('Yet another beautiful post.', CURRENT_TIMESTAMP, 'What Ive felt, what Ive known, never shine in what I ve shown.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));

INSERT INTO comments(user_id, post_id, date, text)
VALUES(
  (SELECT id FROM users WHERE nickname = 'fstk1337'),
  (SELECT id FROM posts WHERE title = 'The very first post.'),
  CURRENT_TIMESTAMP,
  'So good news to see your first POST!'
);

INSERT INTO comments(user_id, post_id, date, text)
VALUES(
  (SELECT id FROM users WHERE nickname = 'fstk1337'),
  (SELECT id FROM posts WHERE title = 'The very first post.'),
  CURRENT_TIMESTAMP,
  'You are not so good indeed. Just try more.'
);

INSERT INTO comments(user_id, post_id, date, text)
VALUES(
  (SELECT id FROM users WHERE nickname = 'fstk1337'),
  (SELECT id FROM posts WHERE title = 'Yet another beautiful post.'),
  CURRENT_TIMESTAMP,
  'Help me to get into your thought, please.'
);
