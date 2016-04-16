var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);


function select(section) {
  [].map.call($$('.selected'), function (element) {
    element.classList.remove('selected');
  });
  var element = $(section) || $('#portfolio');
  element.classList.add('selected');
  element.querySelector('article').classList.add('selected');
  [].map.call($$('a[href="#' + element.id + '"'), function (element) {
    element.classList.add('selected');
  });
}

select();
window.addEventListener('hashchange', function () {
  select(window.location.hash);
});