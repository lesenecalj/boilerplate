import jwt from 'jsonwebtoken';

export function validateBodyUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Body is wrong');
  }
  next();
}

export function validateUserIdParam(req, res, next) {
  const { id } = req.params;
  if (!id) {
    throw new Error('Input is wrong');
  }
  next();
}

export function authToken(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET || '';
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    throw new Error('Token is invalid');
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (!token) {
      throw new Error('Token is invalid');
    }
    req.user = user;
    next();
  });
}
