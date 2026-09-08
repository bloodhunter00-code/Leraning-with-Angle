/* =========================================================
   LEARNING WITH ANGLE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu when a navigation link is clicked */

    const navigationLinks =
      navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navigation.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        menuToggle.textContent = "☰";

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      const clickedInsideNavigation =
        navigation.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNavigation &&
        !clickedMenuButton
      ) {

        navigation.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        menuToggle.textContent = "☰";

      }

    });

  }


  /* =======================================================
     CLOSE MOBILE MENU ON ESCAPE
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (navigation && menuToggle) {

        navigation.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

        menuToggle.textContent = "☰";

      }

    }

  });


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  const smoothLinks =
    document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const header =
    document.querySelector(".site-header");

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     INTERSECTION OBSERVER
     Simple reveal animation
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".course-card, .tool-card, .process-step, .about-brand"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const currentYear =
    document.querySelector("[data-current-year]");

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     BASIC BUTTON FEEDBACK
     ======================================================= */

  const comingSoonElements =
    document.querySelectorAll(".coming-soon");

  comingSoonElements.forEach((element) => {

    element.setAttribute(
      "title",
      "This feature will be available soon."
    );

  });

})
