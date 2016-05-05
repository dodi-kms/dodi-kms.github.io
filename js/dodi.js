var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

function select(hash) {

  var element = $((hash||'').split('-')[0]);

  if (!element) {
    return;
  }

  // Select a <section> (photo series).
  if (!element.classList.contains('selected')) {

    // Un-select every <section>.
    [].map.call($$('section.selected'), function (element) {
      element.classList.remove('selected');
    });

    // Select the specified <section>.
    element.classList.add('selected');

    // Un-mark any selected links.
    [].map.call($$('a.selected'), function (element) {
      element.classList.remove('selected');
    });

    // Mark any links to this series as selected.
    [].map.call($$('a:not(.arrow)[href="#' + element.id + '"'), function (element) {
      element.classList.add('selected');
    });

    // Connect up/down arrows to adjacent series.
    toSection($('.up.arrow'), element.previousElementSibling);
    toSection($('.down.arrow'), element.nextElementSibling);

  }

  // Select a <section>'s <article> (particular photo).
  var articles = element.querySelectorAll('article');
  var index = parseInt(hash.split('-')[1]);
  index = (index ? Math.min(index, articles.length - 1) : 0);

  if (!articles[index].classList.contains('selected')) {

    // Un-select every <article>.
    [].map.call($$('article.selected'), function (element) {
      element.classList.remove('selected');
    });

    // Select the specified <article>.
    articles[index].classList.add('selected');

    // Connect left/right arrows to ajacent photos.
    toArticle($('.left.arrow'), element, articles, index - 1);
    toArticle($('.right.arrow'), element, articles, index + 1);

  }

}

function toSection(arrow, section) {
  if (section && section.tagName.toLowerCase() === 'section') {
    arrow.classList.add('visible');
    arrow.href = '#' + section.id;
  } else {
    arrow.classList.remove('visible');
  }
}

function toArticle(arrow, section, articles, index) {
  var article = articles[index];
  if (article && article.tagName.toLowerCase() === 'article') {
    arrow.classList.add('visible');
    arrow.href = '#' + section.id + (index ? '-' + index : '');
  } else {
    arrow.classList.remove('visible');
  }
}

window.addEventListener('hashchange', function () {
  select(window.location.hash);
});

window.addEventListener('keydown', function (event) {
  var i = event.keyCode - 37;
  var arrow = $('.' + ['left','up','right','down'][i] + '.arrow');
  if (!arrow || !arrow.classList.contains('visible')) {
    return;
  }
  arrow.click();
});

select(window.location.hash || '#portfolio');
