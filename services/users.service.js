
class UserService {

  static async getUsers(ctx) {
    try {
      const [users] = await ctx.state.db.query('SELECT * FROM users');
      console.log(users);
      return users;
    } catch (e) {
      console.error(e);
      throw e; } }



  static async addUser(ctx) {
    try {
      const data = ctx.request.body;

      await ctx.state.db.query(`
        INSERT INTO users (name, email)
        VALUES (?, ?)`,
        [data.name, data.email]
      );

      const response = {message: `Added '${data.name}' user`};
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

module.exports = UserService;