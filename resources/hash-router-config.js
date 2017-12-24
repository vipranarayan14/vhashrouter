HashRouter.init({
  defaultRoute: '#/Intro',
  routes: [
    {
      hash: '#/Intro',
      targetId: 'Intro'
    },
    {
      hash: '#/sample-external-page/{}/',
      targetId: 'External-page',
      sourceUrl: 'external-pages/index.html',
      resources: [
        'external-pages/script.js',
        'external-pages/script2.js',
        'external-pages/style.css'
      ],
      onNavigate (args) {

        console.log(args);
        runEachTime();

      },
      onLoadResources () {

        console.log('Loaded Resources!');

      }
    },
    {
      hash: '#/gallery',
      targetId: 'gallery',
      sourceUrl: 'external-pages/gallery.html',
    },
    {
      hash: '#/License',
      targetId: 'License',
      sourceUrl: 'LICENSE'
    },
    {
      hash: '#/Introduction/{}/{}/',
      targetId: 'Intro',
      onNavigate (args) {

        console.log(args);

      }
    }
  ]
});
