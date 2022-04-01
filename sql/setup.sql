-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS github_users;
DROP TABLE IF EXISTS tweets;

CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT
);

CREATE TABLE tweets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tweet VARCHAR(225) NOT NULL
)
