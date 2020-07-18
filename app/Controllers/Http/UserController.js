'use strict'

const User = use('App/Models/User');

class UserController {
  async index({ response }) {
    const users = await User.query().with('tokens').fetch();
    return response.json(users);
  }

  async register({request, response}) {
    const data = request.only(['username', 'email', 'password']);
    const user = await User.create(data);

    return user;
  }

  async authenticated({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = UserController
