document.addEventListener("DOMContentLoaded", function () {
    const accordionWraps = document.querySelectorAll(".accordion-wrap");

    accordionWraps.forEach((wrap) => {
        const header = wrap.querySelector(".accordion-header");
        const content = wrap.querySelector(".accordion-text");

        if (header && content) {
            header.addEventListener("click", function () {
                const isActive = content.classList.contains("active");

                accordionWraps.forEach((otherWrap) => {
                    const otherContent = otherWrap.querySelector(".accordion-text");
                    const otherHeader = otherWrap.querySelector(".accordion-header");
                    const otherIcon = otherHeader.querySelector(".fa");

                    if (otherContent) {
                        otherContent.classList.remove("active");
                        otherContent.style.display = "none"; // 閉じる
                    }

                    if (otherHeader) {
                        otherHeader.classList.remove("active");
                    }

                    if (otherIcon) {
                        otherIcon.classList.remove("rotate-fa");
                    }
                });

                if (!isActive) {
                    content.classList.add("active");
                    content.style.display = "block"; // ← ここで表示
                    header.classList.add("active");

                    const icon = header.querySelector(".fa");
                    if (icon) icon.classList.add("rotate-fa");
                }
            });
        }
    });
});
