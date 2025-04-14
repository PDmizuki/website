document.addEventListener("DOMContentLoaded", function () {
    const accordionWraps = document.querySelectorAll(".accordion-wrap");

    accordionWraps.forEach((wrap) => {
        const header = wrap.querySelector(".accordion-header");
        const content = wrap.querySelector(".accordion-text");

        header.addEventListener("click", function () {
            const isActive = content.classList.contains("active");

            // 他のアコーディオンを閉じる
            accordionWraps.forEach((otherWrap) => {
                const otherContent = otherWrap.querySelector(".accordion-text");
                const otherHeader = otherWrap.querySelector(".accordion-header");
                const otherIcon = otherHeader.querySelector(".fa");

                otherContent.classList.remove("active");
                otherHeader.classList.remove("active");
                if (otherIcon) otherIcon.classList.remove("rotate-fa");
            });

            // クリックしたアコーディオンを開く（閉じる場合はスキップ）
            if (!isActive) {
                content.classList.add("active");
                header.classList.add("active");
                const icon = header.querySelector(".fa");
                if (icon) icon.classList.add("rotate-fa");
            }
        });
    });

    // 回転クリック処理（別機能）
    const clickables = document.querySelectorAll(".clickable");
    clickables.forEach((el) => {
        el.addEventListener("click", function () {
            el.classList.toggle("rotated");
        });
    });
});
