document.addEventListener("DOMContentLoaded", function () {
    // カスタムカーソル用要素を作成
    const cursor = document.createElement("div");
    const stalker = document.createElement("div");
    cursor.id = "cursor";
    stalker.id = "stalker";

    document.body.classList.add("custom-cursor");
    document.body.appendChild(cursor);
    document.body.appendChild(stalker);

    // 基本スタイル適用
    Object.assign(cursor.style, {
        opacity: "0",
        pointerEvents: "none",
        position: "fixed",
        zIndex: "9999"
    });

    Object.assign(stalker.style, {
        opacity: "0",
        pointerEvents: "none",
        position: "fixed",
        zIndex: "9998"
    });

    // ホバー対象
    const hoverTargets = document.querySelectorAll("a, .accordion-wrap, .card, .se-tab-w");

    hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor--hover");
            stalker.classList.add("stalker--hover");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor--hover");
            stalker.classList.remove("stalker--hover");
        });
    });

    // カーソル追従処理
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        Object.assign(cursor.style, {
            opacity: "1",
            top: `${y}px`,
            left: `${x}px`
        });

        setTimeout(() => {
            Object.assign(stalker.style, {
                opacity: "1",
                top: `${y}px`,
                left: `${x}px`
            });
        }, 150);
    });

    // a タグクリック時の処理（必要な場合のみ e.preventDefault）
    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href === "javascript:void(0)") {
                e.preventDefault();
            }
        });
    });
});
