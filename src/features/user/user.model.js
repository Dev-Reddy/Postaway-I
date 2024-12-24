import ApplicationError from "../../error/applicationError.js";

export default class UserModel {
  constructor(name, email, password, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //  signup method
  static signUp(name, email, password) {
    const user = new UserModel(name, email, password, users.length + 1);
    users.push(user);
    return user;
  }

  // login method
  static signIn(email, password) {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new ApplicationError("Invalid credentials", 401);
    }
    return user;
  }
}

let users = [
  new UserModel("John Doe", "john@doe.com", "123456", 1),
  new UserModel("Jane Doe", "jane@doe.com", "123456", 2),
  new UserModel("John Smith", "john@smith.com', '123456", 3),
];
