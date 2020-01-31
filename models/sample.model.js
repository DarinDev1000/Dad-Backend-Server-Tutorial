
class Sample {

  static async sampleFunction(ctx) {
    try {
      const text = "This is a sample test";
      ctx.body = text;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  
  static async sampleJson(ctx) {
    try {
      const json = {
        message: "This is a sample message",
        format: "json",
        users: [
            {
              id: 1658,
              name: 'test Name'
            },
            {
              id: 6578,
              name: 'some Name'
            },
            {
              id: 9823,
              name: 'the saying'
            },
            {
              id: 1572,
              name: 'api'
            }
          ]
        };
      ctx.body = json;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Sample;