console.log("Hello, Webpack!");

// ページ判定
const page = document.body.dataset.page; // 例: <body data-page="contact"> のように設定

// 各ページ固有の処理
switch (page) {
   case "contact":
      import("./style/form.css");
      import("./js/form.js");
      break;

   case "matching":
      import("./style/matching.css");
      import("./js/hearing.js");
      break;
}

/////////// all css

// audio icon
//import '@fortawesome/fontawesome-free/css/all.min.css';
// font
//import "./assets/fonts/fonts.css";

// Mobile all（共通適用）
import("./js/page.js");

// PC all
import "./style/all.css";      // 全ページ共通
import "./style/noise.css";    // ノイズ
import "./style/home.css";     // Topページ
import "./style/menu.css";     // メニュー
//import "./style/bot.css";      // ボット
import "./style/footer.css";   // フッター
import "./style/gallery.css";   // フッター
//import "https://use.typekit.net/meg7mel.css";

// 共通 JavaScript
import "./js/all.js"; // section
import "./js/cursor.js"; // cursor
import "./js/chat.js"; // chat
import "./js/fade.js"; // fade
import "./js/side-foot.js"; // head foot
import "./js/load.js"; // load
import "./js/google.js"; // google
import "./js/time.js"; // google
import "./js/security.js";
import "./js/page.js";
import "./js/bg_wave.js";

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

import "./assets/audio/tukinohikari.mp3";