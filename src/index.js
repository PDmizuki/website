console.log("Hello, Webpack!");

// ページ判定
const page = document.body.dataset.page; // 例: <body data-page="contact"> のように設定

/////////// all css

// audio icon
import '@fortawesome/fontawesome-free/css/all.min.css';
// font
import "./assets/fonts/fonts.css";

// PC all
import "./style/all.css";  // all page
import "./style/menu.css"; // menu
import "./style/cursor.css"; // cursor
import "./style/section.css"; // section
import "./style/bot.css"; // bot
import "./style/footer.css"; // footer
import "./style/accordion.css"; // accordion
import "./style/modal.css"; // modal
import "./style/se-list.css"; // modal
import "./style/se_card.css"; // modal
import "./style/card.css"; // modal

// Mobile all（共通適用）
import "./style/mobile-all.css"; // all text
import "./style/mobile-page.css"; // all page
import "./style/tab.css"; // tab

// 各ページ固有の処理
if (page === "service") {
   import("./style/se_card.css");
   import("./style/card.css");
   import("./style/se-list.css");
   import("./js/se_card.js");
   import("./js/se-list.js");
} else if (page === "contact") {
   import("./style/form.css");
   import("./js/form.js");
} else if (page === "mobile") {
   import("./js/tab.js");
}

// 共通 JavaScript
import "./js/section.js"; // section
import "./js/cursor.js"; // cursor
import "./js/accordion.js"; // accordion
import "./js/chat.js"; // chat
import "./js/fade.js"; // fade
import "./js/head-foot.js"; // head foot
import "./js/modal.js"; // modal
import "./js/tab.js"; // tab
import "./js/se-list.js"; // tab
import "./js/se_card.js"; // tab
import "./js/card.js"; // tab

/////////// all images
import "./assets/images/pd.ico";
import "./assets/images/pd.png";
import "./assets/images/pc-main-bg.png";
// bg
import "./assets/images/text-gold.png";
import "./assets/images/text-bronze.png";
// section
import "./assets/images/bg-a.png";
import "./assets/images/bg-c.png";
import "./assets/images/bg-s.png";
import "./assets/images/bg-p.png";
//mobile
import "./assets/images/mobile-main-bg.png";
import "./assets/images/mobile-main-second.png";
