document.addEventListener("DOMContentLoaded", function () {
    const accordionWraps = document.querySelectorAll(".accordion-wrap");

    accordionWraps.forEach((wrap) => {
        const header = wrap.querySelector(".accordion-header");
        const content = wrap.querySelector(".accordion-text");

        if (header && content) {
            header.addEventListener("click", function () {
                const isActive = content.classList.contains("active");

                // 他のアコーディオンをすべて閉じる
                accordionWraps.forEach((otherWrap) => {
                    const otherHeader = otherWrap.querySelector(".accordion-header");
                    const otherContent = otherWrap.querySelector(".accordion-text");
                    const otherIcon = otherHeader.querySelector(".fa");

                    if (otherContent) otherContent.classList.remove("active");
                    if (otherHeader) otherHeader.classList.remove("active");
                    if (otherIcon) otherIcon.classList.remove("rotate-fa");
                });

                // 現在クリックしたアコーディオンを開閉
                if (!isActive) {
                    content.classList.add("active");
                    header.classList.add("active");

                    const icon = header.querySelector(".fa");
                    if (icon) icon.classList.add("rotate-fa");
                }
            });
        }
    });

    // 回転クリック用（別機能としてそのまま保持）
    const clickables = document.querySelectorAll(".clickable");
    clickables.forEach((el) => {
        el.addEventListener("click", function () {
            el.classList.toggle("rotated");
        });
    });
});
