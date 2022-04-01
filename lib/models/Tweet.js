const pool = require('../utils/pool');

module.exports = class Tweet {
  id;
  tweet;

  constructor(row) {
    this.id = row.id;
    this.tweet = row.tweet;
  }

  static async insert({ tweet }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                tweets(tweet)
            VALUES
                ($1)
            RETURNING
            *
            `,
      [tweet]
    );
    return new Tweet(rows[0]);
  }
};
