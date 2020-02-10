const pythonService = require("../services/python.service");

class PythonModel {

  static async testFunction(ctx) {
    try {
      const data = await pythonService.testPythonFunction(ctx);
      ctx.body = data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  
  // static async addUser(ctx) {
  //   try {
  //     const data = await userService.addUser(ctx);
  //     ctx.body = data;
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // }

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = PythonModel;