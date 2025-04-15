  document.querySelectorAll('.accordion-wrap').forEach(wrap => {
    const headers = wrap.querySelectorAll('.accordion-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        // すべて閉じる
        wrap.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-text').style.maxHeight = null;
          i.querySelector('.accordion-text').style.padding = '0';
          i.querySelector('.fa').classList.remove('rotate-fa');
        });

        // クリックしたものだけ開く（開いてたら閉じる）
        if (!isActive) {
          item.classList.add('active');
          const text = item.querySelector('.accordion-text');
          text.style.maxHeight = text.scrollHeight + 'px';
          text.style.padding = '1rem';
          item.querySelector('.fa').classList.add('rotate-fa');
        }
      });
    });
  });
