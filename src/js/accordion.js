document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-wrap").forEach(wrap => {
      const checkboxes = wrap.querySelectorAll(".accordion-toggle");
      const headers = wrap.querySelectorAll(".accordion-header");
      const icons = wrap.querySelectorAll(".fa");
  
      checkboxes.forEach((checkbox, index) => {
        const icon = icons[index];
  
        const updateState = () => {
          if (checkbox.checked) {
            // 他のチェックを外す（同じwrap内）
            checkboxes.forEach((cb, i) => {
              if (cb !== checkbox) {
                cb.checked = false;
                icons[i].classList.remove("rotate-fa");
              }
            });
            icon.classList.add("rotate-fa");
          } else {
            icon.classList.remove("rotate-fa");
          }
        };
  
        checkbox.addEventListener("change", updateState);
        headers[index].addEventListener("click", () => {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        });
      });
    });
  });
  