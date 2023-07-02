INSERT INTO users(nickname, password, first_name, last_name)
VALUES('fstk1337', 'hahaha1337R#', 'Vitali', 'Shvaichuk');

INSERT INTO posts(title, date, content, user_id)
VALUES('The very first post.', CURRENT_TIMESTAMP, 'I wrote this just to check it out. Please believe.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));

INSERT INTO posts(title, date, content, user_id)
VALUES('Yet another beautiful post.', CURRENT_TIMESTAMP, 'What Ive felt, what Ive known, never shine in what I ve shown.',
(SELECT id FROM users WHERE nickname = 'fstk1337'));
