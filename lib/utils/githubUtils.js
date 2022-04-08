const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
      code,
    }),
  })
    .then((resp) => resp.json())
    .then(({ access_token }) => access_token);
};

const getGithubProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((resp) => resp.json())
    .then(({ login, avatar_url, email }) => {
      login, avatar_url, email;
    });
  // return profileResp.json;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
