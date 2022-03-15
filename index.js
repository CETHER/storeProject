const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const morgan = require('morgan');
const helmet = require('helmet');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.json({
    description: 'Hola server en express',
  });
});
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}`);
});
