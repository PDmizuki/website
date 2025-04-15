document.addEventListener("DOMContentLoaded", function () {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 0;
            this.offsetAdjust = 0; // 調整用のオフセット変数
            this.init();
        }

        init() {
            const tabs = document.querySelectorAll(".tab");
            tabs.forEach(tab => {
                tab.addEventListener("click", (event) => {
                    this.onTabClick(event, tab);
                });
            });

            window.addEventListener("scroll", () => this.onScroll());
            window.addEventListener("resize", () => this.onResize());
            this.onScroll();
        }

        onTabClick(event, element) {
            event.preventDefault();
            const href = element.getAttribute("href");
            const target = document.querySelector(href);

            if (target) {
                const tabContainerHeight = this.tabContainerHeight;
                const scrollTop = target.offsetTop - tabContainerHeight + 1 + this.offsetAdjust;

                window.scrollTo({
                    top: scrollTop,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    this.updateTabPosition();
                }, 500); // アニメーション後に更新
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
            const tabs = document.querySelector(".tabs");
            const tabsContainer = document.querySelector(".tabs-container");

            if (!tabs || !tabsContainer) return;

            const offset = tabs.offsetTop + tabs.offsetHeight - this.tabContainerHeight + this.offsetAdjust;

            if (window.scrollY > offset) {
                tabsContainer.classList.add("tabs-container--top");
            } else {
                tabsContainer.classList.remove("tabs-container--top");
            }
        }

        findCurrentTabSelector() {
            const tabs = document.querySelectorAll(".tab");
            let newCurrentId = null;
            let newCurrentTab = null;

            tabs.forEach(tab => {
                const id = tab.getAttribute("href");
                const target = document.querySelector(id);
                if (target) {
                    const offsetTop = target.offsetTop - this.tabContainerHeight + this.offsetAdjust;
                    const offsetBottom = offsetTop + target.offsetHeight;

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
            if (this.currentTab) {
                const slider = document.querySelector(".tab-slider");
                if (slider) {
                    const width = this.currentTab.offsetWidth;
                    const left = this.currentTab.offsetLeft;

                    slider.style.width = width + "px";
                    slider.style.left = left + "px";
                }
            }
        }

        updateTabPosition() {
            // scrollイベントを手動で発火
            this.onScroll();
        }
    }

    new StickyNavigation();
});
