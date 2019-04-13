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

var refresh = document.getElementsByClassName("refresh");

function spin(el) {
    el.onclick = function() {
        el.classList.add("rotated");
        setTimeout(function() {
            el.classList.remove("transitioned");
        }, 900);
        setTimeout(function() {
            el.classList.remove("rotated");
        }, 1000);
        setTimeout(function() {
            el.classList.add("transitioned");
        }, 1100);
    }
}

for (var i = 0; i < refresh.length; i++) {
    spin(refresh[i].children[0]);
}

// Create new nephew

var addNew = document.getElementById("add-new-button");
var addContainer = document.getElementById("add-member");
var member = addContainer.previousElementSibling.cloneNode([true]);

addNew.onclick = function() {
    addContainer.parentNode.insertBefore(member, addContainer);
    member = addContainer.previousElementSibling.cloneNode([true]);
    var names = document.getElementsByClassName("nephew-name");
    names[names.length - 1].innerHTML = document.getElementById("nephew-name-input").value;
}