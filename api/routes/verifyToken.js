const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  //   console.log(req.headers);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("token is not valid");
      // console.log(user);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  //   console.log(req.params.id);
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("your are not allowed  to do that");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("your are not allowed to do that");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
