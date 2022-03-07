const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    description: 'Hola server en express',
  });
});

app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}`);
});
