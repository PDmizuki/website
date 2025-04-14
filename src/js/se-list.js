document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready");

    const tabs = document.querySelectorAll(".list-tab");
    const containers = document.querySelectorAll(".container");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            console.log("Tab clicked");

            const tabId = tab.id.replace("li-tab--", "");
            console.log("Tab ID: " + tabId);

            // すべてのタブから 'selected' を削除し、クリックされたタブに追加
            tabs.forEach(function (t) {
                t.classList.remove("selected");
            });
            tab.classList.add("selected");

            // すべてのコンテンツを非表示にし、対応するコンテンツを表示
            containers.forEach(function (container) {
                container.classList.remove("show");
            });

            const targetContent = document.getElementById("content--" + tabId);
            if (targetContent) {
                targetContent.classList.add("show");
            }
        });
    });

    // 初期状態で li-tab--first をクリックして連動
    const initialTab = document.getElementById("li-tab--first");
    if (initialTab) {
        initialTab.click();
    }
});
