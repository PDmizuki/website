document.addEventListener('DOMContentLoaded', function () {
  class StickyNavigation {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabs = document.querySelectorAll('.tab');
      this.tabSlider = document.querySelector('.tab-slider');
      this.tabsContainer = document.querySelector('.tabs-container');
      this.tabContainerHeight = this.tabsContainer.offsetHeight || 50;
      this.offsetAdjust = 0;

      this.init();
    }

    init() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', (event) => this.onTabClick(event, tab));
      });

      window.addEventListener('scroll', () => this.onScroll());
      window.addEventListener('resize', () => {
        this.tabContainerHeight = this.tabsContainer.offsetHeight;
        this.setSliderCss();
      });

      this.onScroll();
    }

    onTabClick(event, tab) {
      event.preventDefault();
      const targetId = tab.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const scrollTop = target.offsetTop - this.tabContainerHeight + 1 + this.offsetAdjust;
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });

        setTimeout(() => {
          this.setSliderCss();
        }, 500);
      }
    }

    onScroll() {
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
    }

    checkTabContainerPosition() {
      this.tabsContainer.classList.add('tabs-container--top');
    }

    findCurrentTabSelector() {
      let newCurrentId = null;
      let newCurrentTab = null;

      this.tabs.forEach(tab => {
        const id = tab.getAttribute('href');
        const target = document.querySelector(id);
        if (target) {
          const offsetTop = target.offsetTop - this.tabContainerHeight + this.offsetAdjust;
          const offsetBottom = target.offsetTop + target.offsetHeight - this.tabContainerHeight + this.offsetAdjust;

          if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
            newCurrentId = id;
            newCurrentTab = tab;
          }
        }
      });

      if (this.currentId !== newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }

    setSliderCss() {
      if (this.currentTab && this.tabSlider) {
        const width = this.currentTab.offsetWidth;
        const left = this.currentTab.offsetLeft;

        this.tabSlider.style.width = width + 'px';
        this.tabSlider.style.left = left + 'px';
      }
    }
  }

  new StickyNavigation();
});
