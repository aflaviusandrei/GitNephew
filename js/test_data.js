const {gatherData}  = require("./git_fetch");

const user1 = gatherData('funchal');

user1.then(x => {
    console.log(x);
  });


