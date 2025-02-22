jQuery.noConflict();

(function ($) {
    $(function () {
        var cursor = $("<div id='cursor'></div>");
        var stalker = $("<div id='stalker'></div>");

        // カスタムカーソル用の要素を追加
        $("body").addClass("custom-cursor").append(cursor).append(stalker);

        // カーソルがクリックを阻害しないように設定
        cursor.css({
            "opacity": "0",
            "pointer-events": "none",
            "position": "fixed",
            "z-index": "9999"
        });

        stalker.css({
            "opacity": "0",
            "pointer-events": "none",
            "position": "fixed",
            "z-index": "9998"
        });

        // ホバーアニメーション
        $(document).on("mouseenter", "a, .accordion-wrap, .card, .se-tab-w", function () {
            cursor.addClass('cursor--hover');
            stalker.addClass('stalker--hover');
        });

        $(document).on("mouseleave", "a, .accordion-wrap, .card, .se-tab-w", function () {
            cursor.removeClass('cursor--hover');
            stalker.removeClass('stalker--hover');
        });

        // マウス移動時にカーソル位置を更新
        $(document).on("mousemove", function (e) {
            var x = e.clientX;
            var y = e.clientY;

            cursor.css({
                "opacity": "1",
                "top": y + "px",
                "left": x + "px"
            });

            setTimeout(function () {
                stalker.css({
                    "opacity": "1",
                    "top": y + "px",
                    "left": x + "px"
                });
            }, 150);
        });

        // クリックイベントの調整（不要な e.preventDefault を削除）
        $(document).on("click", "a", function (e) {
            var href = $(this).attr("href");

            // href が "#" や "javascript:void(0)" の場合のみ遷移を防ぐ
            if (!href || href.startsWith("#") || href === "javascript:void(0)") {
                e.preventDefault();
            }
        });
    });
})(jQuery);
