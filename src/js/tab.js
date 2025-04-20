document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const targetElement = document.querySelector(href === "#" || href === "" ? "html" : href);

      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: top,
          behavior: "smooth"
        });
      }
    });
  });
});
