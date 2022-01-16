const GroupModel = require("../models/group");
const UserModel = require("../models/user");

module.exports = {
  createGroup: (req, res) => {
    const group = new GroupModel(req.body);

    UserModel.findById(req.body.manager, (err, user) => {
      if (user.isParticipant) {
        res.status(400).send("User is not manager");
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
    GroupModel.findById(req.params.id, (err, group) => {
      if (err) {
        res.status(404).send(err);
      } else {
        UserModel.findById(req.body.userId, (err, user) => {
          if (!user || !user.isParticipant) {
            res.status(400).send("User is not participant");
          } else {
            group.participants.push(req.body.userId);
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
  },

  leaveGroup: (req, res) => {
    GroupModel.findById(req.params.id, (err, group) => {
      if (err) {
        res.status(404).send(err);
      } else if (!group.participants.includes(req.body.userId)) {
        res
          .status(400)
          .send("There is not participant in this group with such id");
      } else {
        const updatedParticipants = group.participants.filter(
          (participant) => participant.toString() !== req.body.userId
        );
        group.participants = updatedParticipants;
        group.save((err, updatedGroup) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send(updatedGroup);
          }
        });
      }
    });
  },

  getGroup: (req, res) => {
    GroupModel.findById(req.params.id)
      .populate("manager", "name surname email city")
      .populate("participants", "name surname  email city")
      .exec((err, group) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(group);
        }
      });
  },
};
