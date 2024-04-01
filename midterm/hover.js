document.addEventListener('DOMContentLoaded', function() {
    var logo = document.getElementById("logo");
    var text = document.getElementById("hovertxt");
    logo.onmouseenter = function() {
        text.style.display = "block";
    };
    logo.onmouseleave = function(){
        text.style.display = "none";
    }
});

