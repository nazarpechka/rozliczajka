const { createUser, getGroups } = require('../controllers/user');

module.exports = (router) => {
  router.route('/user')
    .post(createUser);

  router.route('/user/:id/groups')
    .get(getGroups)
};
