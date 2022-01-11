const user = require('./user');
const group = require('./group');

module.exports = (router) => {
  user(router);
  group(router);

  return router;
};
