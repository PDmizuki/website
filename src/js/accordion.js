document.addEventListener("DOMContentLoaded", function () {
    const accordionWraps = document.querySelectorAll(".accordion-wrap");

    accordionWraps.forEach((wrap) => {
        wrap.addEventListener("click", function () {
            const header = this.querySelector(".accordion-header");
            const content = this.querySelector(".accordion-text");

            // トグル開閉
            content.classList.toggle("active");

            // クラスの切り替え
            header.classList.toggle("accordion-gold");
            header.classList.toggle("active");

            const icon = header.querySelector(".fa");
            if (icon) icon.classList.toggle("rotate-fa");

            // 他のアコーディオンを閉じる
            accordionWraps.forEach((otherWrap) => {
                if (otherWrap !== this) {
                    const otherContent = otherWrap.querySelector(".accordion-text");
                    const otherHeader = otherWrap.querySelector(".accordion-header");
                    const otherIcon = otherWrap.querySelector(".fa");

                    otherContent.classList.remove("active");
                    otherHeader.classList.remove("accordion-gold", "active");
                    if (otherIcon) otherIcon.classList.remove("rotate-fa");
                }
            });
        });
    });

    // 回転クリック処理
    const clickables = document.querySelectorAll(".clickable");
    clickables.forEach((el) => {
        el.addEventListener("click", function () {
            el.classList.toggle("rotated");
        });
    });
});
