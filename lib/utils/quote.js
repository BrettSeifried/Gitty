const fetch = require('cross-fetch');

module.exports = class Quote {
  author;
  content;
  constructor({ author, content }) {
    this.author = author;
    this.content = content;
  }

  static getQuotes() {
    const arr = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      ' https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
    ];

    const promiseArr = arr.map((api) => {
      return fetch(api);
    });

    return Promise.all(promiseArr)
      .then((resp) => {
        return Promise.all(resp.map((item) => item.json()));
      })
      .then((newArr) =>
        newArr.map((item) => {
          if (item.sucess) {
            return {
              author: item.contents.quotes[0].author,
              content: item.contents.quotes[0].quote,
            };
          } else if (item.athor) {
            return {
              author: item.author,
              content: item.content || item.en,
            };
          } else {
            return {
              author: 'None',
              content: 'None',
            };
          }
        })
      );
  }
};
