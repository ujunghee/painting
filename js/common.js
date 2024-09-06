// import _ from '../node_modules/lodash/lodash.js';
// import { gsap } from '../node_modules/gsap/index.js';
// import Swiper from '../node_modules/swiper/swiper.mjs';

const _ = window._;
const { gsap } = window;

//ajax start
function loadPage(page, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText;

                const decoPages = ['deco_spring.html', 'deco_autumn.html', 'deco_summer.html', 'deco_winter.html', 'last.html'];
                const firstPages = ['first.html'];
                const twoPages = ['next.html'];

                if (firstPages.includes(page)) {
                    animateElements();
                }

                if (twoPages.includes(page)) {
                    initializeNext();
                    animateElementsTwo();
                }

                if (decoPages.includes(page)) {
                    animateElementsThree();
                    initializeDeco();
                    Swiperbox();
                }

                if (callback) callback();
            } else {
                console.error('Error loading page:', xhr.status, xhr.statusText);
            }

        }
    };
    xhr.send();
}

// 기본 페이지 로드
document.addEventListener('DOMContentLoaded', function () {
    loadPage('first.html', function () {
        animateElements();
        Swiperbox();
    });
});

// 함수 전역 정의
window.loadPage = loadPage;
//ajax end  

// 첫페이지 gsap start
function animateElements() {

    var tl = gsap.timeline({
        ease: "sine.inOut",
    })

    tl.to('.title svg path', {
        opacity: 1,
        y: 0,
    });

    tl.to('.start p', {
        opacity: 1,
        y: 0,
        stagger: {
            each: 0.05,
        }
    }, '<=-.5');

    tl.to('.time', {
        ease: "sine.inOut",
        duration: 1,
        opacity: 1,
    }, '<=.7')

    tl.to('.start .button', {
        opacity: 1,
        y: 50,
        display: 'none',
    }, '<=.2');

    tl.to('.start .button', {
        opacity: 1,
        y: 0,
        display: 'block',
    }, '<=.1');

    tl.to('.butterfly-01', {
        duration: 2,
        x: "random(-15, 15)",
        y: "random(-15, 15)",
        scale: .95, // 크기 살짝 변화
        rotation: -15,
        repeat: -1,
        yoyo: true,
        duration: "random(1.5, 2.5)",
    });

    tl.to('.butterfly-02', {
        x: "random(-15, 15)", // 랜덤한 수평 이동
        y: "random(-10, 10)", // 랜덤한 수직 이동
        scale: .95, // 크기 살짝 변화
        duration: "random(1.5, 2.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    }, '<=');
}
// 첫페이지 gsap end


// 두번째 페이지 gsap start
function  animateElementsTwo() {
    var tlTwo = gsap.timeline({
        ease: "sine.inOut",
    })

    tlTwo.to('.next-txt', {
        opacity:1,
        y:0,
    })

    tlTwo.to('.select-box ul li', {
        opacity: 1,
        y: 0,
        stagger: {
            each: 0.1,
        },
    }, '<=.2');

    tlTwo.to('.select .button', {
        opacity: 1,
        y: 50,
        display: 'none',
    }, '<=.2');

    tlTwo.to('.select .button', {
        opacity: 1,
        y: 0,
        display: 'block',
    }, '<=.1');
}
// 두번째 페이지 gsap end 


// 세번째 페이지 gsap start
function animateElementsThree() {

    const tlthree = gsap.timeline({
        ease: "sine.inOut",
    })

    tlthree.to('.deco-title', {
        opacity: 1,
        y: 0,   
    })

    tlthree.to('.deco .swiper-slide', {
        opacity: 1,
        y: 0,   
        stagger: {
            each: 0.035,
        },
    },'<=')

    tlthree.to('.coloroption', {
        opacity:1,
        y:0,
        stagger: {
            each: 0.05,
        },
    },'<=-.1') 
}
// 세번째 페이지 gsap end


// swiper
function Swiperbox() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 6,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}
