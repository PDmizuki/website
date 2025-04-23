document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById('thanksModal');
  const closeButton = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  if (modal) modal.style.display = "none";

  function toggleLabel(input) {
    if (input.value.trim() !== "") {
      input.classList.add("not-empty");
    } else {
      input.classList.remove("not-empty");
    }
  }

  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", () => toggleLabel(input));
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      // フォーム送信
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            if (modal) {
              modal.style.display = "block";
              modal.classList.add("show");
            }
            form.reset(); // 入力値をクリア
            inputs.forEach(input => input.classList.remove('not-empty'));
          } else {
            alert('送信に問題が発生しました。サーバーからエラーが返されました。');
            console.error('送信エラー:', response);
          }
        })
        .catch(error => {
          alert('送信に問題が発生しました。ネットワークエラーの可能性があります。');
          console.error('ネットワークエラー:', error);
        });
    });
  }

  if (closeButton && modal) {
    closeButton.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    });
  }

  if (modal) {
    window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => (modal.style.display = "none"), 300);
      }
    });
  }
});
