const fetch = require('node-fetch');


let countRepos = [];
let userData = {
  projectNames: '',
  projectCount: '',

}


fetch('https://api.github.com/users/funchal/repos', {
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
  },
})
  .then(res => res.json()) // expecting a json response
  .then(json => {
    for (var i in json) {
        countRepos.push(json[i].name);
    }
    userData.projectNames = countRepos;
    userData.projectCount = json.length - 1;
  });



