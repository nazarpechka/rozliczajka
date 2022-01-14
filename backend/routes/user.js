const { createUser, getGroups, login } = require('../controllers/user');

module.exports = (router) => {
  router.route('/user')
    .post(createUser);

  router.route('/user/:id/groups')
    .get(getGroups)

  router.route('/user/sign-up')
    .get(login) 
};
