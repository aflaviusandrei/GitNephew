const fetch = require('node-fetch');


async function fetchUserData(username) {
  const res = await fetch
    ('https://api.github.com/users/' + username, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
      },
    })

  const data = await res.json();

  let userData = {
    name: data.name,
    location: data.location,
    repos: data.public_repos,
    followers: data.followers
  }
  return await (userData);
}


async function fetchRepos(username) {
  const res = await fetch
    ('https://api.github.com/users/' + username + "/repos", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
      },
    })
  const data = await res.json();
  var repos = [];
  for (var i in data) {
    repos.push(data[i].name);
  }
  return await (repos);
}


async function gatherData(username) {
  let x = await fetchUserData(username);
  let y = await fetchRepos(username);
  return [x, y];
}

/*
gatherData('funchal').then(x => {
  console.log(x);
});
*/

exports.gatherData = gatherData;


