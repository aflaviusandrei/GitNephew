const gatherData  = require("./git_fetch");
//console.log(gatherData('funchal'));
/* usage of gatherData

gatherData('funchal').then(x => {
  console.log(x);
});
*/
var x = gatherData('funchal');
console.log(x);