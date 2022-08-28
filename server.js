const { application } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/test', (req, res, next) => {
  res.send('hello there')
})

app.get('/api/quotes/random', (req, res, next) => {
  res.json({quote: getRandomElement(quotes)})
})

app.get('/api/quotes', (req, res, next) => {
  res.json({quotes: quotes})
})

app.post('/api/quotes', (req, res, next) => {
  // res.json(req.body)
  const newQ = {
    person: req.query.person,
    quote: req.query.quote
  }
  if(newQ.person && newQ.quote) {
    quotes.push(newQ)
  } else {
    res.status(400).send()
  }
  res.json({quote: req.query})
})
