document.addEventListener("DOMContentLoaded", function () {
    const cardWrappers = document.querySelectorAll(".card-wrapper");

    cardWrappers.forEach((cardWrapper) => {
        cardWrapper.addEventListener("click", function () {
            const isActive = cardWrapper.classList.contains("active");

            // 全カードをリセット
            cardWrappers.forEach((el) => {
                el.classList.remove("active");
                el.style.transform = "";
                el.style.zIndex = 1;

                const bg = el.querySelector(".card-background");
                if (bg) bg.removeAttribute("style");
            });

            if (!isActive) {
                cardWrapper.classList.add("active");
                cardWrapper.style.zIndex = 100;

                setTimeout(() => {
                    // 拡大
                    cardWrapper.style.transition = "transform 0.3s ease";
                    cardWrapper.style.transform = "scale(1.2)";

                    setTimeout(() => {
                        // ウィンドウサイズ・カードサイズ・位置を取得
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        const cardRect = cardWrapper.getBoundingClientRect();
                        const scrollX = window.scrollX || window.pageXOffset;
                        const scrollY = window.scrollY || window.pageYOffset;

                        const translateX = (windowWidth / 3.75 - cardRect.width / 3.75) - (cardRect.left + scrollX);
                        const translateY = (windowHeight / 2.5 - cardRect.height / 2.5) - (cardRect.top + scrollY);

                        cardWrapper.style.transition = "transform 0.25s ease";
                        cardWrapper.style.transform = `scale(1.2) translate(${translateX}px, ${translateY}px)`;

                        setTimeout(() => {
                            const cardBackground = cardWrapper.querySelector(".card-background");
                            if (cardBackground) {
                                Object.assign(cardBackground.style, {
                                    fontFamily: "sans-serif",
                                    top: "0",
                                    left: "47%",
                                    width: "75vmin",
                                    height: "auto",
                                    maxHeight: "40vmin",
                                    padding: "1vmin 4vmin 2vmin 22vmin",
                                    transition: "all 0.25s ease, height 1s ease"
                                });
                            }
                        }, 250); // 中央移動後に背景スタイル適用
                    }, 200); // 拡大後に移動
                }, 50); // z-index 後に拡大
            }
        });
    });
});
