$(document).ready(function() {
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop();
        var threshold = 100; // Change this value to the scroll extent you want

        if (scrollPos > threshold) {
            $('#navbar').addClass('nav-scroll');
        } else {
            $('#navbar').removeClass('nav-scroll');
        }
    });
});

function validateForm() {
    let x = document.forms["contactform"]["email"].value;
    if (x == "") {
      alert("Email must be filled out");
      return false;
    }
}