var menuBut = document.getElementsByClassName("menu-but")[0],
    nav = document.getElementById("navigation"),
    closeNav = document.getElementById("close-nav");

function toggleNav() {
    nav.classList.toggle("open-nav");
}

menuBut.onclick = toggleNav;
closeNav.onclick = toggleNav;