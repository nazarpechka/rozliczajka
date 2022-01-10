const UserModel = require('../models/user');

module.exports = {
  createUser: (req, res) => {
    const user = new UserModel(req.body);

    user.save((err, createdUser) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(createdUser);
      }
    });
  },
};
