const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers["authorization"];   //fetching authorization Header
  const token = authHeader?.split(" ")[1];       // ? : doesn't give error if null or undefined


  if (!token) {
    return res.status(403).json({ message: "No Token Provided!!" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);   //verify the token
    req.userId = decoded.userId;  //saves userId to the request obj, so other routes can use it
    next();                      // Passes control to the next route handler or middleware.

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = protect;
