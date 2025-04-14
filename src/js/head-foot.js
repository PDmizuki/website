document.addEventListener("DOMContentLoaded", function () {
    // ヘッダー読み込み
    fetch("header.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("header-container").innerHTML = html;

            // メニュー関連
            const nav = document.getElementById('navArea');
            const btn = document.querySelector('.toggle_btn');
            const mask = document.getElementById('mask');
            const openClass = 'open';

            if (btn && mask && nav) {
                btn.addEventListener('click', () => nav.classList.toggle(openClass));
                mask.addEventListener('click', () => nav.classList.remove(openClass));
            }

            // オーディオトグル
            const toggleSwitch = document.getElementById('soundToggle');
            const backgroundAudio = document.getElementById('backgroundAudio');

            if (toggleSwitch && backgroundAudio) {
                toggleSwitch.addEventListener('change', () => {
                    if (toggleSwitch.checked) {
                        backgroundAudio.play();
                    } else {
                        backgroundAudio.pause();
                        backgroundAudio.currentTime = 0;
                    }
                });
            }

            // チャット切り替え関数
            window.toggleChatWindow = function () {
                const chatWindow = document.getElementById("chat-window");
                if (chatWindow) {
                    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "block" : "none";
                }
            };

            // SEO対応（例：トップページのタイトルとメタ）
            updateMetaTags("こだわりの創造 - トップページ", "Webデザイン初心者のための学びの場。ポートフォリオ作成やLP制作が身につく。");
        });

    // フッター読み込み
    fetch("footer.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;

            const yearSpan = document.getElementById('year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });

    // Intersection Observerを使った遅延読み込み
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.onload = () => img.removeAttribute('data-src');
                    obs.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    }
    lazyLoadImages();

    // メタタグ更新関数
    function updateMetaTags(titleText, description) {
        document.title = titleText;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;
    }
});
