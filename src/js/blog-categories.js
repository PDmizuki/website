// jQueryが完全に読み込まれてから実行
$(document).ready(function () {
    // JSONデータ
    const blogPosts = [
                    //{
              //   title: "Works Blog 1",
              //   content: "Works content 1",
              //   category: "works",
              //   url: "blog-details.html?id=1"
              //},
              //{
              //   title: "実績 Blog 1",
              //   content: "実績 content 1",
              //   category: "results",
              //   url: "blog-details.html?id=2"
              //},
              //{
              //   title: "Web制作",
              //   content: "Web制作 デザイン",
              //   category: "web",
              //   url: "blog-details.html?id=4"
              //},
              //{
              //   title: "マーケティング Blog 1",
              //   content: "マーケティング content 1",
              //   category: "marketing",
              //   url: "blog-details.html?id=6"
              //}
              //{
              //   title: "個人事業サポート Blog 1",
              //   content: "個人事業サポート content 1",
              //   category: "business-support",
              //   url: "blog-details.html?id=7"
              //}
       {
          title: "デザイン Blog",
          content: "デザイン基礎 UI/UX",
          category: "design",
          url: "blog_design.html"
       },
       {
          title: "SEO対策の基本",
          content: "SEO",
          category: "seo",
          url: "blog_seo.html"
       },
       {
          title: "キーワードリサーチ",
          content: "SEO Keyword",
          category: "seo",
          url: "blog_seo-keyword.html"
       },
       {
          title: "高品質なコンテンツ作成",
          content: "SEO Contents",
          category: "seo",
          url: "blog_seo-contents.html"
       }
    ];
 
    // DOM要素を取得
    const $categoryName = $('#category-name');
    const $articlesContainer = $('#articles-container');
 
    // URLパラメータからカテゴリを取得
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
 
    // カテゴリ名を表示
    if (category) {
       $categoryName.text(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
       $categoryName.text('All');
    }
 
    // 指定されたカテゴリに応じた記事を表示
    const filteredPosts = blogPosts.filter(post => !category || post.category === category);
 
    // 記事の表示
    if (filteredPosts.length > 0) {
       filteredPosts.forEach(post => {
          const articleHTML = `
             <div class="article">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <a href="${post.url}" target="_blank">続きを読む</a>
             </div>
          `;
          $articlesContainer.append(articleHTML);
       });
    } else {
       $articlesContainer.html('<p>該当する記事がありません。</p>');
    }
 });
 