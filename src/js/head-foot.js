    var $j = jQuery.noConflict();

    $j(function () {
        // ヘッダー読み込み
        $j("#header-container").load("header.html", function () {
            // メニュー関連の初期化（ヘッダー内の要素が読み込まれた後）
            var $nav = $j('#navArea');
            var $btn = $j('.toggle_btn');
            var $mask = $j('#mask');
            var open = 'open'; // クラス名

            if ($btn.length && $mask.length) {
                $btn.on('click', function () {
                    $nav.toggleClass(open);
                });

                $mask.on('click', function () {
                    $nav.removeClass(open);
                });
            } else {
                console.warn('Menu button or mask not found');
            }

            // オーディオトグルの初期化
            var toggleSwitch = document.getElementById('soundToggle');
            var backgroundAudio = document.getElementById('backgroundAudio');

            if (toggleSwitch && backgroundAudio) {
                toggleSwitch.addEventListener('change', function () {
                    if (toggleSwitch.checked) {
                        backgroundAudio.play();
                    } else {
                        backgroundAudio.pause();
                        backgroundAudio.currentTime = 0;
                    }
                });
            } else {
                console.warn('Toggle switch or background audio element not found');
            }

            // チャットウィンドウ切り替え
            window.toggleChatWindow = function () {
                var chatWindow = document.getElementById("chat-window");
                if (chatWindow) {
                    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "block" : "none";
                }
            };
        });

        // フッター読み込み
        $j("#footer-container").load("footer.html", function () {
            var yearSpan = document.getElementById('year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });

        // 画像の遅延読み込み
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function (img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function () {
                img.removeAttribute('data-src');
            };
        });
    });
