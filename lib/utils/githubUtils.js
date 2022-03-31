const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const resp = await fetch('https://github.com/login/oauth/access_token', {
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
  });
  const { access_token } = await resp.json();
  return access_token;
};

const getGithubProfile = async (token) => {
  const profileResp = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return profileResp.json;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
