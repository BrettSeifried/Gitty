const { Router } = require('express');
const Quote = require('../utils/quote.js');

module.exports = Router().get('/', (req, res, next) => {
  Quote.getQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
