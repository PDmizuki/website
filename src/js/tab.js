document.addEventListener('DOMContentLoaded', function () {
  class StickyNavigation {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabs = document.querySelectorAll('.tab');
      this.tabSlider = document.querySelector('.tab-slider');
      this.tabsContainer = document.querySelector('.tabs-container');
      this.tabContainerHeight = this.tabsContainer.offsetHeight || 50; // ← 高さ取得
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

      // 初回実行
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
      const tabs = document.querySelector('.tabs');
      if (!tabs) return;

      const offset = tabs.offsetTop + tabs.offsetHeight - this.tabContainerHeight + this.offsetAdjust;
      if (window.scrollY > offset) {
        this.tabsContainer.classList.add('tabs-container--top');
        this.tabsContainer.style.opacity = '1';
      } else {
        this.tabsContainer.classList.remove('tabs-container--top');
        this.tabsContainer.style.opacity = '0';
      }
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
