const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({
        message:
          "No token provided! It should be included in the x-access-token header.",
      });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.id = decoded.id;
    req.isParticipant = decoded.isParticipant;
    next();
  });
};

module.exports = verifyToken;
