const { createGroup } = require('../controllers/group');

module.exports = (router) => {
  router.route('/group')
    .post(createGroup);
};