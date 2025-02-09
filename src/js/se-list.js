(function ($) {
    $(document).ready(function () {
        console.log("Document ready");

        $(".list-tab").click(function () {
            console.log("Tab clicked");

            // クリックされたタブのIDから「li-tab--」を削除して識別子を取得
            var tabId = $(this).attr("id").replace("li-tab--", "");
            console.log("Tab ID: " + tabId);

            // すべてのタブから `selected` を削除し、クリックされたタブに追加
            $(".list-tab").removeClass("selected");
            $(this).addClass("selected");

            // すべてのコンテンツを非表示にし、対応するコンテンツを表示
            $(".container").removeClass("show");
            $("#content--" + tabId).addClass("show");
        });

        // 初期状態で `li-tab--first` をクリックして連動
        $("#li-tab--first").trigger("click");
    });
})(jQuery);
