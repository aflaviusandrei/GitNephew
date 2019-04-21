const fetch = require('node-fetch');


async function fetchUserData(username) {
  const res = await fetch
    (`https://api.github.com/users/${username}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
      },
    })

  const data = await res.json();

  //console.log(data);

  let userData = {
    name: data.name,
    location: data.location,
    repos: data.public_repos,
    followers: data.followers,
    avatar_url: data.avatar_url,
    login: data.login
  }
  return await (userData);
}

async function fetchEvents(username) {
  const res = await fetch
    (`https://api.github.com/users/${username}/events`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
      },
    })
  const data = await res.json();

  // Count total events of different types
  let tp = 0, tc = 0, la;

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "PushEvent") {
      tc += data[i].payload.commits.length;
      tp++;
    }
  }

  la = data[0].created_at.substring(0, 10);
  la.replace("-", ".");

  return ({
    totalPushes: tp,
    totalCommits: tc,
    lastActivity: la,
   // raw: data
  });

}

async function fetchRepos(username) {
  const res = await fetch
    (`https://api.github.com/users/${username}/repos`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923' 
      },
    })
  const data = await res.json();
  var repos = [];
  for (var i in data) {
    let repo = {
      repoName: data[i].name,
      repoURL: data[i].html_url
    }
    repos.push(repo);
  }
  return (repos);
}


async function gatherData(username) {
  console.log('now returning');
  return {
    userData: await fetchUserData(username),
    repoData: await fetchRepos(username),
    eventsData: await fetchEvents(username)
  }
}

/*
gatherData('funchal').then(x => {
  console.log(x);
});
*/

exports.gatherData = gatherData;


