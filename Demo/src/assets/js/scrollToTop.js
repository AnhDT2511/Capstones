$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".navbar-default").css({ "background-color": "#111", "border-color": "#111" });
        } else {
            $(".navbar-default").css({ "background-color": "transparent", "border-color": "rgb(140, 139, 139)" });
        }
    });

    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500);
        return false;
    });
});