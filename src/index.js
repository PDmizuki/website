console.log("Hello, Webpack!");

// ページ判定
const page = document.body.dataset.page; // 例: <body data-page="contact"> のように設定

// 各ページ固有の処理
switch (page) {
   case "service":
      import("./style/se_card.css");
      import("./style/card.css");
      import("./style/se-list.css");
      import("./js/se_card.js");
      import("./js/card.js");
      import("./js/se-list.js");
      break;

   case "contact":
      import("./style/form.css");
      import("./js/form.js");
      break;

   case "blog":
      import("./style/blog.css");
      import("./js/blog.js");
      import("./js/blog-categories.js");
      break;

   case "matching":
      import("./style/matching.css");
      import("./js/hearing.js");
      break;
}

/////////// all css

// audio icon
import '@fortawesome/fontawesome-free/css/all.min.css';
// font
import "./assets/fonts/fonts.css";

// Mobile all（共通適用）
import("./style/mobile-all.css");
import("./style/mobile-page.css");
import("./style/tab.css");
import("./js/tab.js");

// PC all
import "./style/all.css";      // 全ページ共通
import "./style/menu.css";     // メニュー
import "./style/cursor.css";   // カーソル
import "./style/section.css";  // セクション
import "./style/bot.css";      // ボット
import "./style/footer.css";   // フッター
import "./style/accordion.css";// アコーディオン
import "./style/modal.css";    // モーダル

// 共通 JavaScript
import "./js/section.js"; // section
import "./js/cursor.js"; // cursor
import "./js/accordion.js"; // accordion
import "./js/chat.js"; // chat
import "./js/fade.js"; // fade
import "./js/head-foot.js"; // head foot
import "./js/modal.js"; // modal

/////////// all images
import "./assets/images/pd.ico";
import "./assets/images/logo-tyep.png";
import "./assets/images/pd-bg-img.jpg";
import "./assets/images/pd-body-bg.jpg";
// bg
import "./assets/images/text-gold.png";
import "./assets/images/text-bronze.png";
// section
import "./assets/images/bg-a.png";
import "./assets/images/bg-c.png";
import "./assets/images/bg-s.png";
import "./assets/images/bg-p.png";
//mobile
import "./assets/images/mobile-main-second.png";
