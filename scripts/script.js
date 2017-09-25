var mdPages = document.querySelectorAll('.md-page');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});


for (var i = 0, len = mdPages.length; i < len; i++) {

  mdPages[i].innerHTML = marked(mdPages[i].textContent.trim());
}
