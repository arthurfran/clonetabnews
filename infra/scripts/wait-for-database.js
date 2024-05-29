const { exec } = require("node:child_process");

function checkDatabase() {
  exec("docker exec rufador pg_isready --host localhost", callbackfunc);

  function callbackfunc(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkDatabase();
      return;
    }
    console.log("\n\n conectamos \n ");
  }
}

console.log("\n\n aguardando conexão \n\n");
checkDatabase();
