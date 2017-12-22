HashRouter.init({
  defaultRoute: '#/Intro',
  navRoutes: [
    {
      route: '#/sample-external-page/{num}',
      id: 'External-page',
      url: 'external-pages/index.html',
      rsrcs: {
        scripts: ['external-pages/script.js', 'external-pages/script2.js'],
        styles: ['external-pages/style.css']
      },
      onSuccess: function (varss) {

        console.log(varss);
        runEachTime();
      },
      onFailure: function () {

        console.log('Getting external page failed!');
      }
    },
    {
      route: '#/gallery',
      id: 'gallery',
      url: 'external-pages/gallery.html',
    },
    {
      route: '#/License',
      id: 'License',
      url: 'LICENSE'
    },
    {
      route: '#/Introduction/{w}/{e}/',
      id: 'Intro',
      onSuccess: function (varss) {
        
        console.log(varss);
      }
    }
  ]
});