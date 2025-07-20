// Initialize Hero Slider
function initHeroSlider() {
    return new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// Initialize News Slider
function initNewsSlider() {
    return new Swiper('.news-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
}

// Initialize Gallery Slider
function initGallerySlider() {
    return new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        thumbs: {
            swiper: {
                el: '.gallery-thumbs',
                slidesPerView: 4,
                spaceBetween: 10,
                breakpoints: {
                    640: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                }
            }
        }
    });
}

// Initialize all sliders
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.hero-slider')) {
        initHeroSlider();
    }
    
    if (document.querySelector('.news-slider')) {
        initNewsSlider();
    }
    
    if (document.querySelector('.gallery-slider')) {
        initGallerySlider();
    }
});