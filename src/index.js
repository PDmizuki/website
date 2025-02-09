console.log("Hello, Webpack!");

/////////// all css

// audio icon
import(/* webpackChunkName: "fontawesome" */ '@fortawesome/fontawesome-free/css/all.min.css');
// font
import "./assets/fonts/fonts.css";


// PC all page
import "./style/all.css";  // all page
import "./style/menu.css"; // menu
import "./style/cursor.css"; // cursor
import "./style/section.css"; // section
import "./style/bot.css"; // bot
import "./style/footer.css"; // footer
import "./style/accordion.css"; // accordion

// モーダル関連
import "./style/modal.css"; // modal

// PC service
import "./style/card.css"; // card
import "./style/se-list.css"; // tab list

// PC contact and mobile
import "./style/form.css"; // form

// Mobile all page
import "./style/mobile-all.css"; // all text
import "./style/mobile-page.css"; // all page
import "./style/tab.css"; // tab
import "./style/footer.css"; // footer


/////////// all js
// PC all page
import "./js/section.js"; // section
import "./js/cursor.js"; // cursor
import "./js/accordion.js"; // accordion
import "./js/chat.js"; // chat
import "./js/fade.js"; // fade
import "./js/head-foot.js"; // head foot

// about/service/contact/policy
import "./js/modal.js"; // modal

// Service list
import "./js/se-list.js"; // service list

// Contact and mobile
import "./js/form.js"; // form

// Mobile all page
import "./js/tab.js"; // tab


/////////// all images
import "./assets/images/pd.png";  // 画像の読み込み
