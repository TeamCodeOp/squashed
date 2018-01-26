const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(`${__dirname}/../react-client/dist`, 'index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

