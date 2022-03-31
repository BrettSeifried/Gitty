const { Router } = require('express');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/auth/login/callback`
    );
  })
  .get('/login/callback', async (req, res, next) => {
      try {
          const { code } = req.query'
          const token = await exchange
      } catch (error) {
          
      }
  });
