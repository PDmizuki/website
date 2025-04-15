  document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          // 自分以外のチェックを外す
          checkboxes.forEach(other => {
            if (other !== checkbox) other.checked = false;
          });
        }
      });
    });
  });
