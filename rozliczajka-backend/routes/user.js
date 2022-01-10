const { createUser } = require('../controllers/user');

module.exports = (router) => {
  router.route('/user')
    .post(createUser);
};
