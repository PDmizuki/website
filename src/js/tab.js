document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.tabs-container');
  const tabsSection = document.querySelector('.tabs');

  window.addEventListener('scroll', function () {
    const sectionBottom = tabsSection.offsetTop + tabsSection.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY >= sectionBottom) {
      tabsContainer.classList.add('tabs-container--top');
    } else {
      tabsContainer.classList.remove('tabs-container--top');
    }
  });
});
