import express from 'express';
import UserService from '../services/user.service.js';
import { validateBodyUser, validateUserIdParam } from './user.middleware.js';

const router = express.Router();
const userService = new UserService();

router.post('/', validateBodyUser, (req, res) => {
  const { name } = req.body;
  const userSaved = userService.save({ name });
  return res.status(201).send(userSaved);
});

router.get('/:id', validateUserIdParam, (req, res) => {
  const { id } = req.params;
  const user = userService.findById(id);
  res.status(200).json(user);
});

router.put('/:id', validateUserIdParam, validateBodyUser, (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const user = userService.update(id, { name });
  res.json(user);
});

router.delete('/:id', validateUserIdParam, (req, res) => {
  const { id } = req.params;
  userService.delete(id);
  res.status(204).send();
});

export default router;
