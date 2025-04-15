  document.querySelectorAll('.accordion-wrap').forEach(wrap => {
    const items = wrap.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const toggle = item.querySelector('.accordion-toggle');
      const header = item.querySelector('.accordion-header');
      const text = item.querySelector('.accordion-text');
      const icon = item.querySelector('.fa');

      header.addEventListener('click', () => {
        // すでに開いているなら閉じる
        if (toggle.checked) {
          toggle.checked = false;
          text.classList.remove('active');
          icon.classList.remove('rotate-fa');
          return;
        }

        // 他を閉じる
        items.forEach(other => {
          if (other !== item) {
            other.querySelector('.accordion-toggle').checked = false;
            other.querySelector('.accordion-text').classList.remove('active');
            other.querySelector('.fa').classList.remove('rotate-fa');
          }
        });

        // 現在のアコーディオンを開く
        toggle.checked = true;
        text.classList.add('active');
        icon.classList.add('rotate-fa');
      });
    });
  });
