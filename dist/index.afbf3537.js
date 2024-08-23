function gsap() {
    // 나비 이미지 선택
    gsap.to(".img-list img", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}

//# sourceMappingURL=index.afbf3537.js.map
