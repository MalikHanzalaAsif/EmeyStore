import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token; // Check for token
    if (!token) return res.send('Authentication token not provided.');

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = {
      id: verified.id,
      name: verified.name,
      email: verified.email,
    };

    next(); // Proceed to the next middleware or route
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.send('Token expired, please log in again.');
    }
    res.send('Invalid token.');
  }
};

export default verifyToken;
