export default class UserRepository {
  users = [];

  findAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find((user) => user.id == id);
  }

  save(user) {
    this.users.push({ ... user, id: this.users.length + 1 });
  }

  delete(index) {
    this.users.splice(index, 1);
  }

}