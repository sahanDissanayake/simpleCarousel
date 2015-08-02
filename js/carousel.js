$(function() {
    var $carousel           = $('.carousel'),
        $carouselSlides     = $carousel.find('.carouselSlides .slide'),
        slidesCount         = $carouselSlides.length,
        currentSlide        = 0; // Carousel will be started at index 0

    // Configuarable settings
    var slideChangeTime     = 5000,
        transitionSpeed     = 300,
        jQueryEffect        = 'fade';

    // Recurring function for automatic transitions
    var changeSlide = function() {
        $carouselSlides.eq(currentSlide).fadeOut(transitionSpeed, function() {

            // Looking ahead at the next slide
            currentSlide++;

            // "The images should wrap around when the user gets to the end of the list"
            (currentSlide === $carouselSlides.length) ? currentSlide = 0 : null;

            $carouselSlides.eq(currentSlide).fadeIn(transitionSpeed);
        });
    };

    $carouselSlides.hide();
    $carouselSlides.find(':first').show();

    setInterval(changeSlide, slideChangeTime);
});