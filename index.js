const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

const comments = [{ id: 1, author: 'Wilder', message: 'Super !', rating: 4 }];

app.get('/comments', (req, res) => {
  return res.json(comments);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
