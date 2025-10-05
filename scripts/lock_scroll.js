let scrollPos = 0;

const lockScrollClass = "body-no-scroll";

export function lockScroll() {
    scrollPos = window.pageYOffset;

    document.body.classList.add(lockScrollClass);
    document.body.style.top = `-${scrollPos}px`;
}

export function unlockScroll() {
    document.body.classList.remove(lockScrollClass);
    document.body.style.top = "";

    window.scrollTo(0, scrollPos);
}
