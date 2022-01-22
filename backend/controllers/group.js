const GroupModel = require("../models/group");
const UserModel = require("../models/user");

module.exports = {
  createGroup: (req, res) => {
    const group = new GroupModel(req.body);

    if (req.isParticipant) {
      return res.status(400).send({
        message: "You should be a manager to create groups!",
      });
    }

    UserModel.findById(req.body.manager, (err, user) => {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.status(404).send({
          message: "Manager user not found!",
        });
      } else if (user.isParticipant) {
        res.status(400).send({ message: "Provided user is not a manager!" });
      } else {
        group.save((err, createdGroup) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(createdGroup);
          }
        });
      }
    });
  },

  addUser: (req, res) => {
    if (req.isParticipant) {
      return res.status(400).send({
        message: "You should be a manager to add participants to the group!",
      });
    }

    GroupModel.findById(req.params.id, (err, group) => {
      if (err) {
        res.status(400).send(err);
      } else if (!group) {
        res.status(404).send({ message: "Group not found!" });
      } else if (!group.manager.equals(req.id)) {
        res
          .status(400)
          .send({ message: "You are not the manager of this group!" });
      } else if (group.participants.includes(req.body.userId)) {
        res.status(400).send({
          message: "Provided user is already a participant in this group!",
        });
      } else {
        UserModel.findById(req.body.userId, (err, user) => {
          if (err) {
            res.status(500).send(err);
          } else if (!user) {
            res.status(404).send({ message: "User not found!" });
          } else if (!user.isParticipant) {
            res.status(400).send({
              message: "You can't add a manager to the group participants!",
            });
          } else {
            group.participants.push(req.body.userId);
            group.save((err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send();
              }
            });
          }
        });
      }
    });
  },

  removeUser: (req, res) => {
    if (req.isParticipant) {
      return res.status(400).send({
        message:
          "You should be a manager to remove participants from the group!",
      });
    }

    GroupModel.findById(req.params.id, (err, group) => {
      if (err) {
        res.status(400).send(err);
      } else if (!group) {
        res.status(404).send({ message: "Group not found!" });
      } else if (!group.manager.equals(req.id)) {
        res
          .status(400)
          .send({ message: "You are not the manager of this group!" });
      } else if (!group.participants.includes(req.body.userId)) {
        res.status(400).send({
          message: "Provided user is not a participatn of this group!",
        });
      } else {
        const updatedParticipants = group.participants.filter(
          (participant) => !participant.equals(req.body.userId)
        );

        group.participants = updatedParticipants;
        group.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send();
          }
        });
      }
    });
  },

  leaveGroup: (req, res) => {
    GroupModel.findById(req.params.id, (err, group) => {
      if (err) {
        res.status(500).send(err);
      } else if (!group) {
        res.status(404).send({ message: "Group not found!" });
      } else if (!group.participants.includes(req.id)) {
        res.status(400).send({
          message: "You are not a participant in this group",
        });
      } else {
        const updatedParticipants = group.participants.filter(
          (participant) => !participant.equals(req.id)
        );
        group.participants = updatedParticipants;
        group.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send();
          }
        });
      }
    });
  },

  getGroup: (req, res) => {
    GroupModel.findById(req.params.id)
      .populate("manager", "name surname email city")
      .populate("participants", "name surname email city")
      .exec((err, group) => {
        if (err) {
          res.status(500).send(err);
        } else if (!group) {
          res.status(404).send({ message: "Group not found!" });
        } else if (
          !group.participants.find(({ _id }) => _id.equals(req.id)) &&
          !group.manager._id.equals(req.id)
        ) {
          res
            .status(400)
            .send({ message: "You are not allowed to view this group!" });
        } else {
          res.send(group);
        }
      });
  },
};
