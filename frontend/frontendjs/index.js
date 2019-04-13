var tryButton = document.getElementsByClassName("try-button")[0],
    regArea = document.getElementById("getstarted"),
    closeReg = document.getElementById("close-reg");

function toggleReg() {
    regArea.classList.toggle("open-reg");
}

tryButton.onclick = toggleReg;
closeReg.onclick = toggleReg;

function toggleNav() {
    nav.classList.toggle("open-nav");
}

var menuBut = document.getElementsByClassName("menu-but")[0],
    nav = document.getElementById("navigation"),
    closeNav = document.getElementById("close-nav");

menuBut.onclick = toggleNav;
closeNav.onclick = toggleNav;

var regOpts = document.getElementsByClassName("reg-opt"),
    login = document.getElementById("login"),
    register = document.getElementById("register");

regOpts[0].onclick = function() {
    login.classList.add("picked-option");
    register.classList.remove("picked-option");
    document.getElementsByClassName("highlight")[0].classList.remove("highlight");
    this.classList.add("highlight");
}

regOpts[1].onclick = function() {
    login.classList.remove("picked-option");
    register.classList.add("picked-option");
    document.getElementsByClassName("highlight")[0].classList.remove("highlight");
    this.classList.add("highlight");
}