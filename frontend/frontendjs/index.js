var tryButton = document.getElementsByClassName("try-button")[0];
var regArea = document.getElementById("getstarted");
var closeReg = document.getElementsByClassName("close-reg")[0];

tryButton.onclick = function() {

    regArea.classList.toggle("open-reg");

}

closeReg.onclick = function() {

    regArea.classList.toggle("open-reg");

}