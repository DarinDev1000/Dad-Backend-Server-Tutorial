const userService = require("../services/users.service");

class UserModel {

  static async getUsers(ctx) {
    try {
      const data = await userService.getUsers(ctx);
      ctx.body = data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  
  static async addUser(ctx) {
    try {
      const data = await userService.addUser(ctx);
      ctx.body = data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = UserModel;