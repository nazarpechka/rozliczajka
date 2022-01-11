const { createGroup, addUser, leaveGroup, getGroup} = require('../controllers/group');

module.exports = (router) => {
  router.route('/group')
    .post(createGroup);

  router.route('/group/:id')
    .get(getGroup);
  
  router.route('/group/:id/add-user')
    .post(addUser);
  
  router.route('/group/:id/leave-group')
    .delete(leaveGroup);

};