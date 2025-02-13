jQuery.noConflict();
(function ($) {
    $(function () {
        $(".card-wrapper").on("click", function () {
            const $thisCard = $(this);
            const $cardBackground = $thisCard.find(".card-background");
            const isActive = $thisCard.hasClass("active");

            // すべてのカードをリセット
            $(".card-wrapper").removeClass("active").css({
                transform: "",
                zIndex: 1
            });

            $(".card-background").removeAttr("style"); // 既存のスタイルをリセット

            if (!isActive) {
                $thisCard.addClass("active");

                // 1. z-index を最前面に
                $thisCard.css({ zIndex: 100 });

                setTimeout(() => {
                    // 2. <div class="card-wrapper"> を拡大
                    $thisCard.css({
                        transform: "scale(1.2)",
                        transition: "transform 0.3s ease"
                    });

                    setTimeout(() => {
                        // 3. カードを中央へ移動
                        const windowWidth = $(window).width();
                        const windowHeight = $(window).height();
                        const cardWidth = $thisCard.outerWidth();
                        const cardHeight = $thisCard.outerHeight();
                        const cardOffset = $thisCard.offset();

                        const translateX = (windowWidth / 3.75 - cardWidth / 3.75) - cardOffset.left;
                        const translateY = (windowHeight / 2.5 - cardHeight / 2.5) - cardOffset.top;

                        $thisCard.css({
                            transform: `scale(1.2) translate(${translateX}px, ${translateY}px)`,
                            transition: "transform 0.25s ease"
                        });

                        setTimeout(() => {
                            // 4. .card-background のスタイルを適用
                            $cardBackground.css({
                                fontFamily: "sans-serif",
                                top: "0",
                                left: "47%",
                                width: "75vmin",
                                height: "auto",
                                maxHeight: "40vmin",
                                padding: "1vmin 4vmin 2vmin 22vmin",
                                transition: "all 0.25s ease, height 1s ease"
                            });
                        }, 250); // 中央移動後に背景スタイル適用
                    }, 200); // 拡大後に移動開始
                }, 50); // z-index 変更後に拡大開始
            }
        });
    });
})(jQuery);
