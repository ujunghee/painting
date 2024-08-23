import _ from 'lodash';
import { gsap } from 'gsap';
import Swiper from 'swiper';

//ajax start
function loadPage(page, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText;
                
                const decoPages = ['deco_spring.html', 'deco_autumn.html', 'deco_summer.html', 'deco_winter.html', 'last.html'];
                const firstPages = ['first.html'];

                if (firstPages.includes(page)) {
                    animateElements(); 
                }

                if (decoPages.includes(page)) {
                    initializeDeco();
                    Swiperbox();
                }
                
                if (page === 'next.html') {
                    initializeNext();
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
document.addEventListener('DOMContentLoaded', function() {
    loadPage('first.html', function() {
        initializeDeco(); 
        initializeNext();
        animateElements();
        Swiperbox();
    });
});

// 함수 전역 정의
window.loadPage = loadPage;
//ajax end  

// gsap

// gsap
function animateElements() {

    const mainBtn = document.querySelector('.start .button'); 

    document.addEventListener('', () => {
        
    })

    var tl = gsap.timeline({
        ease: "sine.inOut",
    })

    tl.to('.title svg path', {
        opacity: 1,
        y: 0,
        stagger : {
            each: 0.02,
        }
    });

    tl.to('.start p', {
        opacity: 1,
        y: 0,
        stagger : {
            each: 0.05,
        }
    }, '<=');

    tl.to('.time', {
        ease: "sine.inOut",
        duration: 1,
        opacity: 1,
        stagger: {
            each: 0.1,
        }
    }, '<=.1')

    tl.to('.start .button', {
        opacity: 1,
        y: -50,
    }, '<=.4');

    tl.to('.butterfly-01', {
        duration: 2,
        x: "random(-15, 15)",
        y: "random(-30, 15)",
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
