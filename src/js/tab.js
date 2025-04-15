document.addEventListener('DOMContentLoaded', function () {
  class StickyNavigation {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 0;
      this.offsetAdjust = 0;
      this.tabs = document.querySelectorAll('.tab');
      this.tabSlider = document.querySelector('.tab-slider');
      this.tabsContainer = document.querySelector('.tabs-container');

      this.init();
    }

    init() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', (event) => this.onTabClick(event, tab));
      });

      window.addEventListener('scroll', () => this.onScroll());
      window.addEventListener('resize', () => this.onResize());

      this.onScroll(); // 初期位置設定
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

        // スムーズスクロール後にスライダー位置更新
        setTimeout(() => {
          this.updateTabPosition();
        }, 500);
      }
    }

    onScroll() {
      this.checkTabContainerPosition();
      this.findCurrentTabSelector();
    }

    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }

    checkTabContainerPosition() {
      const tabs = document.querySelector('.tabs');
      if (!tabs) return;

      const offset = tabs.offsetTop + tabs.offsetHeight - this.tabContainerHeight + this.offsetAdjust;
      if (window.scrollY > offset) {
        this.tabsContainer.classList.add('tabs-container--top');
      } else {
        this.tabsContainer.classList.remove('tabs-container--top');
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

          if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
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

    updateTabPosition() {
      this.onScroll();
    }
  }

  new StickyNavigation();
});
