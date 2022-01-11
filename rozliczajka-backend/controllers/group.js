const GroupModel = require('../models/group');
const UserModel = require('../models/user');

module.exports = {
  createGroup: (req, res) => {
    const group = new GroupModel(req.body);

    UserModel.findById(req.body.manager, (err, user) => {
      if (user.isParticipant) {
        res.status(400).send('User is not manager');
      } else {
        group.save((err, createdGroup) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send(createdGroup);
          }
        });
      }
    });
  },

  addUser: (req, res) => {
    GroupModel.findById(req.params.id, async (err, group) => {
      if (err) {
        res.send(err);
      } else {
        UserModel.findById(req.body.userId, (err, user) => {
          if (!user.isParticipant) {
            res.status(400).send('User is not participant');
          } else {
            group.participants.push(req.body.userId)
            group.save((err, updatedGroup) => {
              if (err) {
                res.send(err);
              } else {
                res.status(200).send(updatedGroup);
              }
            });
          }
        });
      }
    });
  }
};
