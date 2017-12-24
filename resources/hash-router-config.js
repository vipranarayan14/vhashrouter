HashRouter.init({
  defaultRoute: '#/Intro',
  routes: [
    {
      hash: '#/Intro',
      viewId: 'Intro'
    },
    {
      hash: '#/Usage',
      viewId: 'Usage'
    },
    {
      hash: '#/Other-features',
      viewId: 'Other-features'
    },
    {
      hash: '#/sample-external-page/{}',
      viewId: 'External-page',
      contentUrl: 'resources/external-pages/index.html',
      resources: [
        'resources/external-pages/script.js',
        'resources/external-pages/script2.js',
        'resources/external-pages/style.css'
      ],
      onNavigate (args) {

        console.log(args);
        console.log('Page Navigated!');

      },
      onLoadResources () {

        console.log('Loaded Resources!');
        runEachTime();
      }
    },
    {
      hash: '#/gallery',
      viewId: 'gallery',
      contentUrl: 'external-pages/gallery.html',
    },
    {
      hash: '#/License',
      viewId: 'License',
      contentUrl: 'LICENSE'
    },
    {
      hash: '#/Introduction/{}/{}/',
      viewId: 'Intro',
      onNavigate (args) {

        console.log(args);

      }
    }
  ]
});
