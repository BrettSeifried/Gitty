const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', authenticate, (req, res, next) => {
    // try {
    //   const tweet = await Tweet.insert({
    //     ...req.body,
    //     username: req.user.username,
    //   });
    //   res.send(tweet);
    // } catch (error) {
    //   next(error);
    // }
    Tweet.insert({
      ...req.body,
    })
      .then((tweet) => res.send(tweet))
      .catch((error) => next(error));
  })
  .get('/', authenticate, (req, res, next) => {
    // try {
    // const tweets = {
    //   id: '1',
    //   tweet: 'How do you center a Div?',
    // };
    // } catch (error) {
    //   next(error);
    // }
    Tweet.getTweets()
      .then((tweets) => res.send(tweets))
      .catch(next)
      .catch((error) => next(error));
  });
