const spawn = require("child_process").spawn; 

class PythonService {

  static testPythonFunction(ctx) {
    try {
      const externalPython = spawn(
        process.env.PYTHON_3_PATH,
        [
          "./externalScripts/hello.py",
          "FirstName",
          "LastName"
        ] 
      ); 

      // console.log(externalPython);

      // Takes stdout data from script which executed 
      // with arguments and send this data to res object 
      // externalPython.stdout.on('data', function(data) { 
      //   console.log(data.toString());
      //   return data.toString();
      // });

      externalPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        return data;
      });

      externalPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      externalPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });

      // return "finished";
    } catch (e) {
      console.error(e);
      throw e; } }

}

module.exports = PythonService;