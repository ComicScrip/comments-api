require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const comments = [];

app.get('/comments', (req, res) => {
  return res.json(comments);
});

app.post('/comments', (req, res) => {
  if (req.query.apiKey !== process.env.API_KEY) {
    res.status(401);
    return res.json({ error: 'wrong api key' });
  }

  const { rating = '', message, author } = req.body;
  const ratingNum = parseInt(rating, 10);
  if (isNaN(ratingNum)) {
    res.status(422);
    return res.json({ error: 'rating is not a number' });
  }
  if (!message) {
    res.status(422);
    return res.json({ error: 'message is empty' });
  }
  if (!author) {
    res.status(422);
    return res.json({ error: 'author is empty' });
  }

  const newComment = { message, author, rating: ratingNum, id: uniqid() };
  comments.push(newComment);
  return res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`server listenting on port ${PORT}`); // eslint-disable-line
});
