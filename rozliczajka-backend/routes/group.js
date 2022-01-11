const { createGroup, addUser } = require('../controllers/group');

module.exports = (router) => {
  router.route('/group')
    .post(createGroup);
  
  router.route('/group/:id/add-user')
    .post(addUser);

};