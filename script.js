/* ========================================
   DIWASH CHAPAGAIN — INTERACTIONS
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = navLinks.querySelectorAll("a");

    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navItems.forEach((item) => {
        item.addEventListener("click", closeMenu);
    });


    // 2. REVEAL ELEMENTS WHEN SCROLLING

    const revealElements = document.querySelectorAll(".reveal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    // 3. 3D PROFILE CARD TILT
    // Only enabled for mouse/trackpad devices.

    const profileCard = document.getElementById("profileCard");

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (profileCard && finePointer && !reduceMotion) {

        profileCard.addEventListener("pointermove", (event) => {

            const rect = profileCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 7;
            const rotateX = ((centerY - y) / centerY) * 7;

            profileCard.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileCard.addEventListener("pointerleave", () => {
            profileCard.style.transform =
                "rotateX(0deg) rotateY(0deg)";
        });
    }


    // 4. CLOSE MOBILE MENU WHEN ESCAPE IS PRESSED

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    // 5. CURRENT YEAR IN CONSOLE FOR DEVELOPMENT

    console.log("Diwash's portfolio is ready.");
});
