// Change upper user icon functionality based on resolution (click on mobile, hover on desktop)

if (window.innerWidth <= 600) {
    var headerUser = document.getElementsByClassName("header-user")[0],
        accountDrop = document.getElementsByClassName("account-dropdown")[0];

    headerUser.onclick = function () {
        accountDrop.classList.toggle("dropped");
    }
}

function repopulate() {
    var events = document.getElementsByClassName("eventsnr");
    var lastActive = document.getElementsByClassName("lastactive");
    var repoNr = document.getElementsByClassName("reponr");
    var followers = document.getElementsByClassName("followers");
    var profileName = document.getElementsByClassName("profilename");
    var projectList = document.getElementsByClassName("list-stat");
    var data = memberDataArr[memberDataArr.length - 1];

    repoNr[repoNr.length - 1].innerText = data.userData.repos;

    followers[followers.length - 1].innerText = data.userData.followers;

    profileName[profileName.length - 1].innerText = data.userData.name;

    for (var i = 0; i < data.repoData.length; i++) {
        var div = document.createElement("div");
        var p = document.createElement("p");
        p.innerText = data.repoData[i];
        div.appendChild(p);
        projectList[projectList.length - 1].appendChild(div);
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
    memberDataArr = [];

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

    function findIndex (but) {
        var k = 0;

        while (nephewButtons[k] != but) k++;

        return k;
    }

    for (var i = 0; i < nephewButtons.length; i++) {
        nephewButtons[i].onclick = function() {
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
    var data = {username: nepGit.value, name:nepName.value};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
        createNephew();
        memberDataArr.push(response);
        repopulate();
        nepName.value = nepGit.value = "";
    })
    .catch(error => console.error('Error:', error));
}




// NOT IN USE FOR NOW

// var data;

// function getData() {
//     fetch('/git', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (res) {
//             repopulate(res.userData, res.repoData);
//         });
// }   

// getData();