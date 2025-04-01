document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");

  function toggleLabel(input) {
    if (input.value.trim() !== "") {  // 空白のみの場合を考慮
      input.classList.add("not-empty");
    } else {
      input.classList.remove("not-empty");
    }
  }

  inputs.forEach(input => {
    // 初期チェック
    toggleLabel(input);

    // 入力イベントでクラスを切り替え
    input.addEventListener("input", function () {
      toggleLabel(this); // `this` を渡して修正
    });

    // フォーカスが外れた時もチェック
    input.addEventListener("blur", function () {
      toggleLabel(this);
    });
  });


  const modal = document.getElementById('thanksModal');
  const closeButton = document.getElementsByClassName('close')[0];
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData
      }).then(response => {
        return response.text().then(text => {  // レスポンスの内容を取得
          console.log("Server Response:", text);
          if (response.ok) {
            submitted = true;  // 送信成功時にフラグを true に
            if (modal) modal.style.display = "block";  // モーダルを表示
            form.reset();  // フォームをリセット
            inputs.forEach(input => input.classList.remove('not-empty'));
          } else {
            alert('送信に問題が発生しました。サーバーからエラーが返されました。');
            console.error('送信エラー:', text);
          }
        });
      }).catch(error => {
        alert('送信に問題が発生しました。ネットワークエラーの可能性があります。');
        console.error('ネットワークエラー:', error);
      });
    });
  }

  // iframe の onload イベントを設定
  const hiddenIframe = document.getElementById('hidden_iframe');
  if (hiddenIframe) {
    hiddenIframe.onload = function () {
      if (submitted) {
        alert('送信が完了しました。');
        submitted = false;  // フラグをリセット
      }
    };
  }

  // モーダルのクローズ処理
  if (modal && closeButton) {
    closeButton.onclick = function () {
      modal.style.display = "none";
    };
  }

  // モーダル外をクリックしたときの閉じる処理
  window.onclick = function (event) {
    if (modal && event.target === modal) {
      modal.style.display = "none";
    }
  };
});
