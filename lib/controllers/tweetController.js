const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const tweets = [
        {
          id: '1',
          tweet: 'How do you center a Div?',
        },
      ];
      res.send(tweets);
    } catch (error) {
      next(error);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const tweet = await Tweet.insert({
        ...req.body,
        username: req.user.username,
      });
      res.send(tweet);
    } catch (error) {
      next(error);
    }
  });
