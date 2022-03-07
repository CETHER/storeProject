const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  app.use('/users', usersRouter);
}

module.exports = routerApi;
