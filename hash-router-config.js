HashRouter.init({
  defaultNavPageID: "Intro",
  navPagesToGet: [
    {
      navPageID: "External-page",
      urlToGet: "external-pages/index.html",
      rsrcsToInject: {
        scripts: ['external-pages/script.js', 'external-pages/script2.js'],
        styles: ['external-pages/style.css']
      },
      onSuccess: function () {
        sayHello();
      },
      onFailure: function () {
        console.log('Pgae');
      }
    },
    {
      navPageID: "gallery",
      urlToGet: "external-pages/gallery.html",
    }
  ]
});