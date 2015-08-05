$(function() {
    var $carousel           = $('.carousel'),
        $carouselSlides     = $carousel.find('.carouselSlides .slide'),
        slidesCount         = $carouselSlides.length
        slideChangeInterval = 0,
        currentSlide        = 0; // Carousel will be started at index 0

    // Configuarable settings
    var slideChangeTime     = 5000,
        transitionSpeed     = 300,
        jQueryEffect        = 'fade';

    // Recurring function for automatic transitions
    var changeSlide = function() {
        // Preventing the carousel from breaking if the user click the next button continuosly
        (currentSlide > $carouselSlides.length) && (currentSlide = 0);

        $carouselSlides.eq(currentSlide).fadeOut(transitionSpeed, function() {

            // Looking ahead at the next slide
            currentSlide++;

            // "The images should wrap around when the user gets to the end of the list"
            (currentSlide === $carouselSlides.length) ? currentSlide = 0 : null;

            $carouselSlides.eq(currentSlide).fadeIn(transitionSpeed);

            // [data-slide] is not 0 indexed
            $carousel.find('.carouselSlideRadioControls input[data-slide="'+ (currentSlide + 1) +'"]').prop('checked', 'checked');
        });
    };

    var jumpToSlide = function(nextSlide) {

        $carouselSlides.eq(currentSlide).fadeOut(transitionSpeed, function() {

            currentSlide = nextSlide;
            $carouselSlides.eq(nextSlide).fadeIn(transitionSpeed);

            // [data-slide] is not 0 indexed
            $carousel.find('.carouselSlideRadioControls input[data-slide="'+ (currentSlide + 1) +'"]').prop('checked', 'checked');
        });
    };

    var upAndDownMove = function(type) {
        var nextSlide = currentSlide;

        if (type === 'next') {
            (currentSlide < $carouselSlides.length - 1) ? (nextSlide++) : (nextSlide = 0); // Move to the next slide
        } else if (type === 'previous') {
            (currentSlide > 0) ? (nextSlide--) : (nextSlide = $carouselSlides.length - 1); // Move to the previous slide
        }

        jumpToSlide(nextSlide);
    };

    $carousel.on('click', '.carouselSlideMainControls button', function(e) {

        clearInterval(slideChangeInterval);

        if ( $(this).hasClass('slidePrevious') ) {
            upAndDownMove('previous');
        } else {
            upAndDownMove('next');
        }

        slideChangeInterval = setInterval(changeSlide, slideChangeTime);
    });

    $carousel.on('click', '.carouselSlideRadioControls input', function() {
        clearInterval(slideChangeInterval);

        jumpToSlide($(this).data('slide') - 1);

        slideChangeInterval = setInterval(changeSlide, slideChangeTime);
    });



    $carouselSlides.not(':first').hide();
    slideChangeInterval = setInterval(changeSlide, slideChangeTime);
});