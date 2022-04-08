const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', authenticate, (req, res, next) => {
    Tweet.insert({
      ...req.body,
    })
      .then((tweet) => res.send(tweet))
      .catch((error) => next(error));
  })
  .get('/', authenticate, (req, res, next) => {
    Tweet.getTweets()
      .then((tweets) => res.send(tweets))
      .catch(next)
      .catch((error) => next(error));
  });
