HashRouter.init({
  defaultRoute: "#/Intro",
  navRoutes: [
    {
      route: "#/sample-external-page/1",
      id: "External-page",
      url: "external-pages/index.html",
      rsrcs: {
        scripts: ['external-pages/script.js', 'external-pages/script2.js'],
        styles: ['external-pages/style.css']
      },
      onSuccess: function () {

        runEachTime();
      },
      onFailure: function () {
        
        console.log('Getting external page failed!');
      }
    },
    {
      route: "#/gallerya",
      id: "gallery",
      url: "external-pages/gallery.html",
    },
    {
      route: "#/License",
      id: "License",
      url: 'LICENSE'
    }
  ]
});