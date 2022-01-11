const UserModel = require('../models/user');
const GroupModel = require('../models/group');

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

  getGroups: (req, res) => {
    GroupModel
      .find({ participants: req.params.id })
      .populate('manager', 'name surname')
      .exec((err, groups) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(groups);
        }
      });
  },
};
