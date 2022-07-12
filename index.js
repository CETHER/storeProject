const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const morgan = require('morgan');
const helmet = require('helmet');

const {
  logErrors,
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

app.use(helmet());
app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.json({
    description: 'Hola server en express',
  });
});
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}`);
});
