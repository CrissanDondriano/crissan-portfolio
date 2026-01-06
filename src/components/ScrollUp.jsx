import React from 'react'

const ScrollUp = () => {
    window.addEventListener("scroll", function () {
        const scrollUp = document.querySelector("#scrollup");
        if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
        else scrollUp.classList.remove("show-scroll");
    });
    return (
        <a href="#" className="scrollup" id='scrollup'>
            <i className="uil uil-arrow-up scrollup__icon"></i>
        </a>
    )
}

export default ScrollUp