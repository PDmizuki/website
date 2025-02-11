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

// modal（全ページで適用）
import "./style/modal.css"; // modal

// 各ページ固有の処理
if (page === "service") {
   require("./style/card.css");
   require("./style/se-list.css");
   require("./js/se-list.js");
} else if (page === "contact") {
   require("./style/form.css");
   require("./js/form.js");
} else if (page === "mobile") {
   require("./style/mobile-all.css");
   require("./style/mobile-page.css");
   require("./js/tab.js");
}

// Mobile all（共通適用）
import "./style/mobile-all.css"; // all text
import "./style/mobile-page.css"; // all page
import "./style/tab.css"; // tab
import "./style/footer.css"; // footer

/////////// all js
// PC all
import "./js/section.js"; // section
import "./js/cursor.js"; // cursor
import "./js/accordion.js"; // accordion
import "./js/chat.js"; // chat
import "./js/fade.js"; // fade
import "./js/head-foot.js"; // head foot

// modal（全ページ共通）
import "./js/modal.js";

// Mobile all
import "./js/tab.js"; // tab

/////////// all images
import "./assets/images/pd.png";  // 画像の読み込み
