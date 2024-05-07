const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  try {
    if (!token)
      return res
        .status(400)
        .json({ status: false, message: "Token not found!" });

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong, try again later!",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;
