// グローバル変数 'submitted' を宣言
let submitted = false;

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById('thanksModal');
  const closeButton = document.getElementsByClassName('close')[0];
  const contactForm = document.getElementById('contactForm');

  // 初期状態でモーダルを非表示
  modal.style.display = "none";

  // 入力欄のラベル管理関数
  function toggleLabel(input) {
    if (input.value.trim() !== "") {
      input.classList.add("not-empty");
    } else {
      input.classList.remove("not-empty");
    }
  }

  // 各入力欄のイベントリスナーを設定
  inputs.forEach(input => {
    toggleLabel(input); // 初期チェック
    input.addEventListener("input", function () {
      toggleLabel(input);
    });
  });

  // フォーム送信処理
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        submitted = true;
        modal.style.display = "block"; // モーダルを表示
        setTimeout(() => {
          modal.classList.add("show");
        }, 10); // ちょっと遅延させるとアニメーションが綺麗になる

        contactForm.reset(); // フォームリセット
        inputs.forEach(input => {
          input.classList.remove("not-empty");
        });

      } else {
        alert('送信に問題が発生しました。');
      }
    }).catch(error => {
      alert('送信に問題が発生しました。');
    });
  });

  // モーダルのクローズボタン
  closeButton.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  };

  // モーダル外をクリックで閉じる
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 400);
    }
  };
});
