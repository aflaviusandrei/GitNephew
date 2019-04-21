// Change upper user icon functionality based on resolution (click on mobile, hover on desktop)

if (window.innerWidth <= 600) {
    var headerUser = document.getElementsByClassName("header-user")[0],
        accountDrop = document.getElementsByClassName("account-dropdown")[0];

    headerUser.onclick = function () {
        accountDrop.classList.toggle("dropped");
    }
}

function findIndexTwo(a, cls) {
    var k = 0, els = document.getElementsByClassName(cls);

    while (els[k] != a) k++;

    return k;
}

function deleteFun() {
    var deleteButtons = document.getElementsByClassName("delete-button");

    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function() {
            fetch("/delete", {
                method: 'POST',
                body: {
                    username: memberDataArr[findIndexTwo(this, "delete-button")].userData.name
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${bToken}`
                }
            });
        }
    }
}

function repopulate() {
    var events = document.getElementsByClassName("eventsnr"),
        repoNr = document.getElementsByClassName("reponr"),
        followers = document.getElementsByClassName("followers"),
        profileName = document.getElementsByClassName("profilename"),
        profilePic = document.getElementsByClassName("profilepic"),
        projectList = document.getElementsByClassName("repo-list"),
        totalPushes = document.getElementsByClassName("pushestotal"),
        totalCommits = document.getElementsByClassName("commitstotal"),
        lastActive = document.getElementsByClassName("lastactive");

    var data = memberDataArr[memberDataArr.length - 1];

    repoNr[repoNr.length - 1].innerText = data.userData.repos;

    followers[followers.length - 1].innerText = data.userData.followers;

    profileName[profileName.length - 1].innerText = data.userData.name;

    totalCommits[totalCommits.length - 1].innerText = data.eventsData.totalCommits;

    totalPushes[totalPushes.length - 1].innerText = data.eventsData.totalPushes;

    lastActive[lastActive.length - 1].innerText = data.eventsData.lastActivity;

    profilePic[profilePic.length - 1].style.background = "url('" + data.userData.avatar_url + "')";
    profilePic[profilePic.length - 1].style.backgroundSize = "cover";


    projectList[lastActive.length - 1].innerHTML = "";
    if (data.repoData.length != 0) {
        for (var i = 0; i < data.repoData.length; i++) {
            var a = document.createElement("a");
            var p = document.createElement("p");
            p.innerText = data.repoData[i].repoName;
            a.setAttribute("href", data.repoData[i].repoURL);
            a.classList.add("indiv-repo");
            a.classList.add("number-" + (profilePic.length - 1));
            a.appendChild(p);
            projectList[lastActive.length - 1].appendChild(a);
        }
    }

    var loader = document.getElementById("loader-container");
    loader.classList.remove("loading-container");
    regArea.classList.remove("open-reg");
}

// Create new nephew

// Register new nephew functionality

// Clone nephew dash area and remove from DOM
var dashDisplay = document.getElementsByClassName("dashboard-display")[0].cloneNode([true]);
var dashIcon = document.getElementsByClassName("nephew-side-box")[0].cloneNode([true]);
document.getElementsByClassName("nephew-side-box")[0].parentNode.removeChild(document.getElementsByClassName("nephew-side-box")[0]);
document.getElementsByClassName("dashboard-display")[0].parentNode.removeChild(document.getElementsByClassName("dashboard-display")[0]);

var tryButton = document.getElementById("add-member"),
    regArea = document.getElementById("getstarted"),
    closeReg = document.getElementById("close-reg"),
    memberDataArr = [], dbNeps = [];

function loadFromDB() {
    for (var i = 0; i < dbNeps.length; i++) {
        dbNeps[i].eventsData.lastActivity = dbNeps[i].eventsData.lastActivity.substring(0, 10);

        var prevPickedNav = document.getElementsByClassName("picked-nav")[0];

        memberDataArr.push(dbNeps[i]);
    
        tryButton.parentNode.insertBefore(dashIcon, tryButton);
        if (prevPickedNav) prevPickedNav.classList.remove("picked-nav");
        dashIcon.classList.add("picked-nav");
        dashIcon = tryButton.previousElementSibling.cloneNode([true]);
        let a = document.getElementsByClassName("nephew-name");
        a[a.length - 1].innerHTML = i;
    
        createNephew();
        nephewNavigation();
        repopulate();
    }

    var prevPickedNav = document.getElementsByClassName("picked-nav"),
        pickedDash = document.getElementsByClassName("picked-dash");

    if (pickedDash) pickedDash[0].classList.remove("picked-dash");
    if (prevPickedNav) prevPickedNav[prevPickedNav.length - 1].classList.remove("picked-nav");
    document.getElementsByClassName("nephew-side-box")[0].classList.add("picked-nav");
    document.getElementsByClassName("dashboard-display")[0].classList.add("picked-dash");
    deleteFun();
}

function toggleReg() {
    regArea.classList.toggle("open-reg");
}

closeReg.onclick = toggleReg;
tryButton.onclick = toggleReg;

var addNew = document.getElementById("add-new-button"),
    addContainer = document.getElementById("add-member");

function createNephew(data) {

    var dashArea = document.getElementById("dashboard-area"),
        prevPicked = document.getElementsByClassName("picked-dash")[0];

    dashArea.appendChild(dashDisplay);

    if (prevPicked) prevPicked.classList.remove("picked-dash");

    dashDisplay.classList.add("picked-dash");

    dashDisplay = document.getElementsByClassName("dashboard-display")[0].cloneNode([true]);

}

function nephewNavigation() {
    var nephewButtons = document.getElementsByClassName("nephew-side-box");

    function findIndex(but) {
        var k = 0;

        while (nephewButtons[k] != but) k++;

        return k;
    }

    for (var i = 0; i < nephewButtons.length; i++) {
        nephewButtons[i].onclick = function () {
            var prevPickedNav = document.getElementsByClassName("picked-nav")[0];
            var prevPickedDash = document.getElementsByClassName("picked-dash")[0];
            var dashes = document.getElementsByClassName("dashboard-display");

            if (prevPickedDash) prevPickedDash.classList.remove("picked-dash");
            if (prevPickedNav) prevPickedNav.classList.remove("picked-nav");

            this.classList.add("picked-nav");
            dashes[findIndex(this)].classList.add("picked-dash");
        }
    }
}

var bToken = window.localStorage.getItem('token');

addNew.onclick = function () {
    var nepName = document.getElementById("nephew-name-input"),
        nepGit = document.getElementById("nephew-github"),
        prevPickedNav = document.getElementsByClassName("picked-nav")[0],
        loader = document.getElementById("loader-container");

    if (prevPickedNav) prevPickedNav.classList.remove("picked-nav");

    loader.classList.add("loading-container");

    tryButton.parentNode.insertBefore(dashIcon, tryButton);
    dashIcon.classList.add("picked-nav");
    dashIcon = tryButton.previousElementSibling.cloneNode([true]);
    let a = document.getElementsByClassName("nephew-name");
    a[a.length - 1].innerHTML = nepName.value;

    nephewNavigation();

    // Request data for new nephew

    var url = '/git';
    var data = { username: nepGit.value, name: nepName.value };

    console.log(bToken);
    fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${bToken}`
        }
    }).then( res => setTimeout(location.reload, 200)) 
        .catch(error => console.error('Error:', error));
}

fetch('/db', {
    method: 'POST',
    body: "",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${bToken}`
    }
}).then(res => res.json())
.then(response => {
    dbNeps = response;
    console.log(dbNeps);
    loadFromDB();
  // document.getElementById("username").innerText = dbNeps[0].bunic;
})
.catch(error => console.error('Error:', error));

// LOG OUT FUNCTIONALITY

var logout = document.getElementById("logout");

logout.onclick = function() {
    window.localStorage.setItem('token', null);
    location.reload(); 
}