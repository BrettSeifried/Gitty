const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../utils/githubUtils');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', (req, res, next) => {
    const { code } = req.query;
    let user;
    exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then(({ login, avatar_url, email }) =>
        GithubUser.findByUsername(login).then((newUser) => {
          if (newUser) {
            user = newUser;
          } else {
            GithubUser.insert({
              username: login,
              avatar: avatar_url,
              email,
            }).then((createUser) => (user = createUser));
          }
        })
      )
      .then(() => {
        const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
          expiresIn: '1 Day',
        });
        res
          .cookie(process.env.COOKIE_NAME, payload, {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
          })
          .redirect('/api/v1/tweets');
      })
      .catch((error) => next(error));
  })

  .delete('/dashboard', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Sign out Successful' });
  });
