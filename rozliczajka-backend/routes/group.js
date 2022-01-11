const { createGroup, addUser, leaveGroup } = require('../controllers/group');

module.exports = (router) => {
  router.route('/group')
    .post(createGroup);
  
  router.route('/group/:id/add-user')
    .post(addUser);
  
  router.route('/group/:id/leave-group')
    .delete(leaveGroup);

};