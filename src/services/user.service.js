import UserRepository from '../repositories/user.repository.js';

export default class UserService {
userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  findById(id) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  update(id, field) {
    const { name } = field;
    if(!name) {
      throw new Error("Name isn't defined");
    }
    const user = this.findById(id);
    user.name = name;
    return user;
  }

  save(user) {
    return this.userRepository.save(user);
  }

  delete(id) {
    if (!id) {
      throw new Error("Id isn't defined");
    }
    const users = this.userRepository.findAll();
    const index = users.findIndex((user) => user.id == id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    return this.userRepository.delete(index);
  }
}