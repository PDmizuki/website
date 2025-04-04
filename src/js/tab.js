jQuery(document).ready(function ($) {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 0;
            this.offsetAdjust = 0; // 調整用のオフセット変数
            this.init();
        }

        init() {
            // 必要な要素が存在するか確認
            if (!$('.tabs-container').length || !$('.tabs-container .tab').length) {
                console.error('必要な要素が見つかりません。');
                return; // 要素がない場合は初期化を中止
            }

            let self = this;
            $('.tabs-container .tab').click(function (event) { // ID を指定してリンクを制限
                self.onTabClick(event, $(this));
            });

            $(window).on('scroll', () => {
                this.onScroll();
            });

            $(window).on('resize', () => {
                this.onResize();
            });

            this.onScroll();
        }

        onTabClick(event, element) {
            event.preventDefault();

            // href 属性の取得
            let href = element.attr('href');
            if (!href || !href.startsWith('#')) {
                console.warn(`無効な href 属性: ${href}`);
                return; // href が不正の場合は処理中止
            }

            // ターゲット要素の取得
            let target = $(href);
            if (target.length === 0) {
                console.warn(`ターゲット要素が存在しません: ${href}`);
                return; // ターゲットが見つからない場合は処理中止
            }

            // スクロール位置の計算
            let scrollTop = target.offset().top - this.tabContainerHeight + 1 + this.offsetAdjust;

            // アニメーション処理
            $('html, body').animate({ scrollTop: scrollTop }, 500, () => {
                this.updateTabPosition(); // アニメーション完了後に更新
            });
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
            let offset = $('.tabs-container').offset().top + $('.tabs-container').outerHeight() - this.tabContainerHeight + this.offsetAdjust;

            if ($(window).scrollTop() > offset) {
                $('.tabs-container').addClass('tabs-container--top');
            } else {
                $('.tabs-container').removeClass('tabs-container--top');
            }
        }

        findCurrentTabSelector() {
            let newCurrentId = null;
            let newCurrentTab = null;
            let self = this;

            $('.tabs-container .tab').each(function () { // ID 指定で制限
                let id = $(this).attr('href');
                let target = $(id);

                if (target.length) {
                    let offsetTop = target.offset().top - self.tabContainerHeight + self.offsetAdjust;
                    let offsetBottom = offsetTop + target.outerHeight();

                    if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() < offsetBottom) {
                        newCurrentId = id;
                        newCurrentTab = $(this);
                    }
                }
            });

            if (this.currentId !== newCurrentId) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                this.setSliderCss();
            }
        }

        setSliderCss() {
            if (this.currentTab && this.currentTab.length) {
                let width = this.currentTab.outerWidth();
                let left = this.currentTab.position().left;

                $('.tabs-container .tab-slider').css({
                    width: width,
                    left: left
                });
            }
        }

        updateTabPosition() {
            $(window).trigger('scroll'); // スクロールイベントを強制発火
        }
    }

    new StickyNavigation();

    // 他のリンクタグのデフォルト動作を維持
    $('a:not(.tabs-container .tab)').click(function (event) {
        let href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            event.preventDefault();
            let target = $(href);
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top }, 500);
            }
        }
    });
});
