(()=>{var t={679:()=>{var t;jQuery.noConflict(),(t=jQuery)(document).ready((function(){t(".accordion-wrap").on("click",(function(){var e=t(this).children().eq(1);e.slideToggle(500),t(this).children().eq(0).toggleClass("accordion-no-bar"),t(this).siblings().find(".accordion-header").removeClass("accordion-gold").removeClass("active"),t(this).siblings().find(".accordion-header i").removeClass("rotate-fa"),t(this).find(".accordion-header").toggleClass("accordion-gold").toggleClass("active"),t(this).find(".fa").toggleClass("rotate-fa"),t(".accordion-wrap .accordion-text").not(e).slideUp(500)})),t(".clickable").on("click",(function(){t(this).toggleClass("rotated")}))}))},403:()=>{document.addEventListener("DOMContentLoaded",(function(){jQuery.noConflict(),jQuery(document).ready((function(t){const e=t("#chat"),o=t('input[name="category"]'),n=t(".keyword-options"),s=t("#send-button"),i=t("#clear-button");function c(o,n){const s=t("<p>").addClass(o).text(n);e.append(s),e.scrollTop(e[0].scrollHeight)}function r(e){for(const o of e){const e=t("<label>").html(`\n              <input type="radio" name="keyword" value="${o}">\n              <span>${o}</span>\n            `);n.append(e)}}s.on("click",(function(){const t=o.filter(":checked").val();if(!t)return void c("bot","カテゴリーを選択してください。");const e=n.find('input[name="keyword"]:checked').val();var s,i;e?c("bot",(i=e,"about"===(s=t)||"works"===s?`カテゴリー：${s}, キーワード：${i}`:`カテゴリー：その他, キーワード：${i}`)):c("bot","キーワードを選択してください。")})),i.on("click",(function(){e.html("")})),o.on("change",(function(){!function(){const t=o.filter(":checked").val();n.empty(),"about"===t?r(["想い：","目的","活動"]):"works"===t?r(["PDでできること","事業内容","作業の流れ"]):"その他"===t&&r(["相談","申込み","料金"])}()}))}))}))},983:()=>{var t;jQuery.noConflict(),(t=jQuery)((function(){var e=t("<div id='cursor'></div>"),o=t("<div id='stalker'></div>");t("body").addClass("custom-cursor").append(e).append(o),t(document).on("mouseenter",".accordion-wrap , a , .card , .se-tab-w",(function(){e.addClass("cursor--hover"),o.addClass("stalker--hover")})),t(document).on("mouseleave",".accordion-wrap , a , .card , .se-tab-w",(function(){e.removeClass("cursor--hover"),o.removeClass("stalker--hover")})),t(document).on("mousemove",(function(t){var n=t.clientX,s=t.clientY;e.css({opacity:"1",top:s+"px",left:n+"px"}),setTimeout((function(){o.css({opacity:"1",top:s+"px",left:n+"px"})}),150)})),e.css("opacity","0"),o.css("opacity","0")}))},475:()=>{document.addEventListener("DOMContentLoaded",(function(){function t(){document.querySelectorAll(".fade_bottom").forEach((function(t){t.getBoundingClientRect().top<.75*window.innerHeight&&t.classList.add("visible")}))}window.addEventListener("scroll",t),t()}))},547:()=>{let t=!1;document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".input-text").forEach((t=>{function e(t){""!==t.value?t.classList.add("not-empty"):t.classList.remove("not-empty")}e(t),t.addEventListener("input",(function(){e(t)}))}));const e=document.getElementById("thanksModal"),o=document.getElementsByClassName("close")[0];document.getElementById("contactForm").addEventListener("submit",(function(o){o.preventDefault();const n=o.target,s=new FormData(n);fetch(n.action,{method:"POST",body:s}).then((o=>{o.ok?(t=!0,e.style.display="block",n.reset(),document.querySelectorAll(".input-text").forEach((t=>{t.classList.remove("not-empty")}))):(alert("送信に問題が発生しました。サーバーからエラーが返されました。"),console.error("送信エラー:",o))})).catch((t=>{alert("送信に問題が発生しました。ネットワークエラーの可能性があります。"),console.error("ネットワークエラー:",t)}))}));const n=document.getElementById("hidden_iframe");n&&(n.onload=function(){t&&(alert("送信が完了しました。"),t=!1)}),o.onclick=function(){e.style.display="none"},window.onclick=function(t){t.target==e&&(e.style.display="none")}}))},8:()=>{document.addEventListener("DOMContentLoaded",(function(){var t,e,o,n;Promise.all([fetch("../header.html").then((t=>t.text())).then((t=>{document.getElementById("header-container").innerHTML=t})),fetch("../footer.html").then((t=>t.text())).then((t=>{document.getElementById("footer-container").innerHTML=t}))]).then((()=>{!function(){const t=document.getElementById("soundToggle"),e=document.getElementById("backgroundAudio");t&&e?t.addEventListener("change",(function(){t.checked?e.play():(e.pause(),e.currentTime=0)})):console.error("Toggle switch or background audio element not found")}()})).catch((t=>{console.error("Error loading header or footer:",t)})),t=document.getElementById("navArea"),e=document.querySelector(".toggle_btn"),o=document.getElementById("mask"),n="open",e&&o?(e.addEventListener("click",(function(){t.classList.contains(n)?t.classList.remove(n):t.classList.add(n)})),o.addEventListener("click",(function(){t.classList.remove(n)}))):console.error("Menu button or mask not found"),document.querySelectorAll("img[data-src]").forEach((function(t){t.setAttribute("src",t.getAttribute("data-src")),t.onload=function(){t.removeAttribute("data-src")}}))}))},256:()=>{var t;jQuery.noConflict(),(t=jQuery)((function(){t(".button").on("click",(function(e){var o;e.preventDefault(),o=t(this).data("modal"),t("#"+o).addClass("show"),t(".modal-overlay").addClass("show")})),t(".modal-overlay, .close").on("click",(function(){t(".modal").removeClass("show"),t(".modal-overlay").removeClass("show")}))}))},346:()=>{var t;(t=jQuery)(document).ready((function(){console.log("Document ready"),t(".list-tab").click((function(){console.log("Tab clicked");var e=t(this).attr("id").replace("li-tab--","");console.log("Tab ID: "+e),t(".list-tab").removeClass("selected"),t(this).addClass("selected"),t(".container").removeClass("show"),t("#content--"+e).addClass("show")})),t("#li-tab--first").trigger("click")}))},914:()=>{jQuery(document).ready((function(t){new class{constructor(){this.currentId=null,this.currentTab=null,this.tabContainerHeight=0,this.offsetAdjust=0,this.init()}init(){let e=this;t(".tab").click((function(o){e.onTabClick(o,t(this))})),t(window).scroll((()=>{this.onScroll()})),t(window).resize((()=>{this.onResize()})),this.onScroll()}onTabClick(e,o){e.preventDefault();let n=t(o.attr("href"));if(n.length){let e=n.offset().top-this.tabContainerHeight+1+this.offsetAdjust;t("html, body").animate({scrollTop:e},500,(()=>{this.updateTabPosition()}))}}onScroll(){this.checkTabContainerPosition(),this.findCurrentTabSelector()}onResize(){this.currentId&&this.setSliderCss()}checkTabContainerPosition(){let e=t(".tabs").offset().top+t(".tabs").height()-this.tabContainerHeight+this.offsetAdjust;t(window).scrollTop()>e?t(".tabs-container").addClass("tabs-container--top"):t(".tabs-container").removeClass("tabs-container--top")}findCurrentTabSelector(){let e,o,n=this;t(".tab").each((function(){let s=t(this).attr("href"),i=t(s);if(i.length){let c=i.offset().top-n.tabContainerHeight+n.offsetAdjust,r=i.offset().top+i.height()-n.tabContainerHeight+n.offsetAdjust;t(window).scrollTop()>c&&t(window).scrollTop()<r&&(e=s,o=t(this))}})),this.currentId===e&&null!==this.currentId||(this.currentId=e,this.currentTab=o,this.setSliderCss())}setSliderCss(){if(this.currentTab){let e=this.currentTab.outerWidth(),o=this.currentTab.position().left;t(".tab-slider").css({width:e,left:o})}}updateTabPosition(){t(window).scroll()}}}))},519:(t,e,o)=>{"use strict";o.r(e)},731:(t,e,o)=>{"use strict";o.r(e)},265:(t,e,o)=>{"use strict";o.r(e)},583:(t,e,o)=>{"use strict";o.r(e)},580:(t,e,o)=>{"use strict";o.r(e)}},e={};function o(n){var s=e[n];if(void 0!==s)return s.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,o),i.exports}o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.p="./",(()=>{"use strict";o(983),o(679),o(403),o(475),o(8),o(256),o(914),o.p,console.log("Hello, Webpack!");const t=document.body.dataset.page;"service"===t?(o(519),o(580),o(346)):"contact"===t?(o(731),o(547)):"mobile"===t&&(o(265),o(583),o(914))})()})();
//# sourceMappingURL=main.js.map