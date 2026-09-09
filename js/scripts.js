/* =========================================================
   PERSONAL TECHNOLOGY TRAINER WEBSITE
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
   ========================================================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("show");
        }

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
);

handleNavbarScroll();


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks =
    document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".course-card, .training-item, .about-content, .training-card, .stat-item"
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COURSE CARD STAGGER ANIMATION
   ========================================================= */

document.querySelectorAll(".course-card")
    .forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


/* =========================================================
   TRAINING ITEM STAGGER
   ========================================================= */

document.querySelectorAll(".training-item")
    .forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 100}ms`;

    });


/* =========================================================
   STAT COUNTER
   ========================================================= */

const statNumbers =
    document.querySelectorAll(".stat-number");


function animateCounter(element) {

    const originalText =
        element.textContent.trim();


    /*
        These values are intentionally kept
        simple because some stats contain
        text such as "1:1" and "College".
    */

    if (
        originalText.includes(":") ||
        isNaN(parseInt(originalText))
    ) {

        return;

    }


    const number =
        parseInt(
            originalText.replace(/\D/g, ""),
            10
        );


    if (!number) return;


    const suffix =
        originalText.replace(/[0-9]/g, "");


    let current = 0;

    const duration = 1000;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                easedProgress * number
            );


        element.textContent =
            current + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                number + suffix;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


const statsSection =
    document.querySelector(".stats");


let statsAnimated = false;


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !statsAnimated
                    ) {

                        statsAnimated = true;

                        statNumbers.forEach(
                            animateCounter
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    statsObserver.observe(
        statsSection
    );

}


/* =========================================================
   HERO IMAGE PARALLAX
   ========================================================= */

const trainerImage =
    document.querySelector(".trainer-image");


if (trainerImage) {

    window.addEventListener(
        "scroll",
        () => {

            /*
                Keep movement subtle so the
                professional photo remains stable.
            */

            if (window.innerWidth > 900) {

                const scrollValue =
                    Math.min(
                        window.scrollY * 0.035,
                        18
                    );

                trainerImage.style.transform =
                    `translateY(${scrollValue}px)`;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   FLOATING TECH CARD HOVER
   ========================================================= */

const techCards =
    document.querySelectorAll(".tech-card");


techCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.animationPlayState =
                "paused";

            card.style.transform =
                "translateY(-8px) scale(1.04)";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.animationPlayState =
                "running";

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   COURSE CARD MOUSE EFFECT
   ========================================================= */

document.querySelectorAll(".course-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 2;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

document.querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   WHATSAPP TRACKING
   ========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );


whatsappLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "WhatsApp training enquiry clicked."
            );

        }
    );

});


/* =========================================================
   EMAIL TRACKING
   ========================================================= */

const emailLinks =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );


emailLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "Email training enquiry clicked."
            );

        }
    );

});


/* =========================================================
   PREVENT EMPTY SOCIAL LINKS
   ========================================================= */

document.querySelectorAll(
    '.social-links a[href="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            console.log(
                "Add your social media URL here."
            );

        }
    );

});


/* =========================================================
   IMAGE LOAD CHECK
   ========================================================= */

if (trainerImage) {

    trainerImage.addEventListener(
        "error",
        () => {

            console.warn(
                "Trainer image not found. Check: images/trainer.png"
            );

        }
    );


    trainerImage.addEventListener(
        "load",
        () => {

            console.log(
                "Trainer image loaded successfully."
            );

        }
    );

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

        console.log(
            "Technology Trainer website loaded successfully."
        );

    }
);
