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

if (window.innerWidth <= 600) {
    var headerUser = document.getElementsByClassName("header-user")[0],
        accountDrop = document.getElementsByClassName("account-dropdown")[0];

    headerUser.onclick = function() {
        accountDrop.classList.toggle("dropped");
    }
}