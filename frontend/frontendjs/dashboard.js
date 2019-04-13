// var menuBut = document.getElementsByClassName("menu-but")[0],
//     nav = document.getElementById("navigation"),
//     closeNav = document.getElementById("close-nav");
//
// function toggleNav() {
//     nav.classList.toggle("open-nav");
// }
//
// menuBut.onclick = toggleNav;
// closeNav.onclick = toggleNav;

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

    headerUser.onclick = function() {
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

// document.addEventListener("click", function(evt) {
//     var target = evt.target;
//
//     if (regArea.classList.contains("open-reg")) {
//         if (checkParent(target, regArea) == 0) toggleReg();
//     }
// });