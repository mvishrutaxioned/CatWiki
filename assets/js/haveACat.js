$(document).ready(() => {

    var topHeight = $('header').height();

    // hide and show toggle btn functioanality
    $(window).scroll(function() {
        if ($(this).scrollTop() > topHeight) {
            $('.toggleUp').addClass('flex');
        } else {
            $('.toggleUp').removeClass('flex');
        }
    });

    // on toggleBtn click functionality
    $('.toggleUp').click(e => {
        e.preventDefault();
        window.scroll({top: 0, behavior: "smooth"});
    })

})