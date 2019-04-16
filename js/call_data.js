const { gatherData } = require("./git_fetch");


var x = gatherData('reversio');

x.then(data => {
  console.log(data);
});



