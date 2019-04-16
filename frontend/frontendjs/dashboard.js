var tryButton = document.getElementById("add-member"),
    regArea = document.getElementById("getstarted"),
    closeReg = document.getElementById("close-reg");

function toggleReg() {
    regArea.classList.toggle("open-reg");
}

closeReg.onclick = toggleReg;
tryButton.onclick = toggleReg;

if (window.innerWidth <= 600) {
    var headerUser = document.getElementsByClassName("header-user")[0],
        accountDrop = document.getElementsByClassName("account-dropdown")[0];

    headerUser.onclick = function () {
        accountDrop.classList.toggle("dropped");
    }
}

function checkParent(target, parent) {
    var is = 0, p = target.parentNode, stop = document.getElementById("dashboard-nav");

    if (p == parent) is = 1;

    while (is == 0 && p != stop) {
        if (p == parent) is = 1;
        p = p.parentNode;
    }

    return is;
}

var refresh = document.getElementsByClassName("refresh");

function spin(el) {
    el.onclick = function () {
        el.classList.add("rotated");
        setTimeout(function () {
            el.classList.remove("transitioned");
        }, 900);
        setTimeout(function () {
            el.classList.remove("rotated");
        }, 1000);
        setTimeout(function () {
            el.classList.add("transitioned");
        }, 1100);
    }
}

for (var i = 0; i < refresh.length; i++) {
    spin(refresh[i].children[0]);
}

function repopulate(userData, repoData) {
    var events = document.getElementsByClassName("eventsnr");
    var lastActive = document.getElementsByClassName("lastactive");
    var repoNr = document.getElementsByClassName("reponr");
    var followers = document.getElementsByClassName("followers");
    var profileName = document.getElementsByClassName("profilename");
    var projectList = document.getElementsByClassName("list-stat");

    repoNr[repoNr.length - 1].innerHTML = userData.repos;
    for (var i = 0; i < repoData.length; i++) {
        var div = document.createElement("div");
        var p = document.createElement("p");
        p.innerText = repoData[i];
        div.appendChild(p);
        projectList[projectList.length - 1].appendChild(div);
    }

    for (i = 0; i < profileName.length; i++) {
        profileName[i].innerText = userData.name;
    }

    for (i = 0; i < followers.length; i++) {
        followers[i].innerText = userData.followers;
    }
}

var data;

function getData() {
    fetch('/git', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            repopulate(res.userData, res.repoData);
            console.log(res);
        });
}   

getData();

// Create new nephew

var addNew = document.getElementById("add-new-button");
var addContainer = document.getElementById("add-member");
var member = addContainer.previousElementSibling.cloneNode([true]);

addNew.onclick = function () {
    addContainer.parentNode.insertBefore(member, addContainer);
    member = addContainer.previousElementSibling.cloneNode([true]);
    var names = document.getElementsByClassName("nephew-name");
    names[names.length - 1].innerHTML = document.getElementById("nephew-name-input").value;

    var nepName = document.getElementById("nephew-name-input").value;
    var nepGit = document.getElementById("nephew-github").value;

    var url = '/git';
    var data = {username: nepGit, name:nepName};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}