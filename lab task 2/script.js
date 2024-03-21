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
    let x = document.forms["contactform"]["email"];
    if (x.value == "") {
    $('#email').removeClass('purple-border');
    $('#email').addClass('red-border');
      
}   
else{
    $('#email').removeClass('red-border');
    $('#email').addClass('purple-border');
    let y = document.forms["contactform"]["feedback"];
    if (y.value == "") {
    $('#inputs').removeClass('purple-border');
    $('#inputs').addClass('red-border');}   
    else{
    $('#inputs').removeClass('red-border');
    $('#inputs').addClass('purple-border');
    }
    }
}
