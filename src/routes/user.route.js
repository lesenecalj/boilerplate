import express from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service.js';
import {
  authToken,
  validateBodyUser,
  validateUserIdParam,
} from './user.middleware.js';

const router = express.Router();
const userService = new UserService();


router.post('/login', validateBodyUser, (req, res) => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const { email, password } = req.body;
  const userSaved = userService.save({ email, password });
  const accessToken = jwt.sign({ email }, jwtSecret, {
    expiresIn: '1h',
  });
  return res.status(201).send({ accessToken });
});

router.get('/:id', authToken, validateUserIdParam, (req, res) => {
  console.log('req.user:', req.user);
  const { id } = req.params;
  const user = userService.findById(id);
  res.status(200).json(user);
});

router.put('/:id', validateUserIdParam, validateBodyUser, (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const user = userService.update(id, { email });
  res.json(user);
});

router.delete('/:id', validateUserIdParam, (req, res) => {
  const { id } = req.params;
  userService.delete(id);
  res.status(204).send();
});

export default router;
