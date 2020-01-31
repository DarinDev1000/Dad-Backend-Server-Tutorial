
class UserService {

  static async getUsers(ctx) {
    try {
      const [users] = await ctx.state.db.query('SELECT * FROM users');
      console.log(users);
      return users;
    } catch (e) {
      console.error(e);
      throw e; } }



  // static async addMessages(ctx) {
  //   try {
  //     const data = ctx.request.body;
  //     let numberAdded = 0;
  //     for (const id in data) {
  //       // console.log(data[id]);
  //       // const [response] = await con.query(`
  //       await ctx.state.db.query(`
  //         INSERT INTO messages (messageTitle, messageContent)
  //         VALUES (?, ?)`,
  //         [data[id].messageTitle, data[id].messageContent]
  //       );
  //       // console.log(response);
  //       numberAdded++;
  //     }
  //     const response = {message: `Added ${numberAdded} messages!`};
  //     console.log(response);
  //     return response;
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // }
}

module.exports = UserService;