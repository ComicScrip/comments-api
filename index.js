const express = require('express');
const cors = require('cors');
const uniqid = require('uniqid');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const comments = [{ id: 1, author: 'Wilder', message: 'Super !', rating: 4 }];

app.get('/comments', (req, res) => {
  return res.json(comments);
});

app.post('/comments', (req, res) => {
  const { message, author, rating } = req.body;
  const ratingNum = parseInt(rating, 10);

  const newComment = { message, author, rating: ratingNum, id: uniqid() };
  comments.push(newComment);

  res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
