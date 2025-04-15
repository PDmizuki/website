document.addEventListener("DOMContentLoaded", () => {
    const accordionWraps = document.querySelectorAll(".accordion-wrap");
  
    accordionWraps.forEach(wrap => {
      const checkboxes = wrap.querySelectorAll(".accordion-toggle");
      const headers = wrap.querySelectorAll(".accordion-header");
      const icons = wrap.querySelectorAll(".fa");
  
      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            // 他のチェックを外す（同じwrap内で）
            checkboxes.forEach((cb, i) => {
              if (cb !== checkbox) {
                cb.checked = false;
                icons[i].classList.remove("rotate-fa");
              }
            });
            icons[index].classList.add("rotate-fa");
          } else {
            icons[index].classList.remove("rotate-fa");
          }
        });
  
        // ヘッダークリックでもトグルできるようにする（任意）
        headers[index].addEventListener("click", () => {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        });
      });
    });
  });
  