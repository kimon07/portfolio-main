const SwiperClass = window.Swiper;

if (typeof SwiperClass !== 'function') {
    console.warn('Swiper를 불러오지 못했습니다. CDN 연결 상태를 확인해주세요.');
} else {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroElement = document.querySelector('[data-hero-swiper]');
    const campaignElement = document.querySelector('[data-campaign-swiper]');
    const productElement = document.querySelector('[data-product-swiper]');

    if (heroElement) {
        new SwiperClass(heroElement, {
            loop: true,
            speed: prefersReducedMotion ? 0 : 900,
            grabCursor: true,
            keyboard: {
                enabled: true,
            },
            autoplay: prefersReducedMotion ? false : {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: heroElement.querySelector('.home-hero-pagination'),
                clickable: true,
            },
            a11y: {
                prevSlideMessage: '이전 메인 배너',
                nextSlideMessage: '다음 메인 배너',
                paginationBulletMessage: '{{index}}번째 메인 배너로 이동',
            },
        });
    }

    if (campaignElement) {
        new SwiperClass(campaignElement, {
            loop: true,
            speed: prefersReducedMotion ? 0 : 700,
            keyboard: {
                enabled: true,
            },
            navigation: {
                prevEl: campaignElement.querySelector('.campaign-prev'),
                nextEl: campaignElement.querySelector('.campaign-next'),
            },
            a11y: {
                prevSlideMessage: '이전 추천 컬렉션',
                nextSlideMessage: '다음 추천 컬렉션',
            },
        });
    }

    if (productElement) {
        new SwiperClass(productElement, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            speed: prefersReducedMotion ? 0 : 650,
            grabCursor: true,
            freeMode: {
                enabled: true,
                momentum: !prefersReducedMotion,
            },
            keyboard: {
                enabled: true,
            },
            scrollbar: {
                el: productElement.querySelector('.featured-scrollbar'),
                draggable: true,
            },
            breakpoints: {
                769: {
                    spaceBetween: 32,
                },
                1280: {
                    spaceBetween: 48,
                },
            },
            a11y: {
                prevSlideMessage: '이전 신제품',
                nextSlideMessage: '다음 신제품',
            },
        });
    }
}

// Visible keyboard/touch controls complement the original swipe interaction.
document.querySelectorAll('[data-hero-swiper],[data-product-swiper]').forEach(element => {
    const swiper = element.swiper;
    if (!swiper) return;
    const controls = document.createElement('div');
    controls.className = 'ae-slider-controls';
    controls.innerHTML = '<button type="button" aria-label="이전 슬라이드">←</button><button type="button" aria-label="다음 슬라이드">→</button>';
    controls.children[0].addEventListener('click', () => swiper.slidePrev());
    controls.children[1].addEventListener('click', () => swiper.slideNext());
    if (element.hasAttribute('data-hero-swiper')) {
        const pause = document.createElement('button');
        pause.type = 'button';
        const update = () => { pause.textContent = swiper.autoplay.running ? '자동 재생 멈춤' : '자동 재생 시작'; pause.setAttribute('aria-pressed', String(!swiper.autoplay.running)); };
        pause.addEventListener('click', () => { if (swiper.autoplay.running) swiper.autoplay.stop(); else swiper.autoplay.start(); update(); });
        update(); controls.append(pause);
    }
    element.after(controls);
});
