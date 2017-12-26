const config = {
  defaultRoute: '#/Intro',
  routes: [
    {
      hash: '#/Intro',
      viewId: 'Intro'
    },
    {
      hash: '#/Introduction',
      viewId: 'Intro',
      onNavigate() {

        console.log('Navigated to "Introduction".');

      }
    },
    {
      hash: '#/Usage',
      viewId: 'Usage',
      onNavigate() {

        console.log('Navigated to "Usage".');

      },
    },
    {
      hash: '#/Other-features/{}/',
      viewId: 'Other-features',
      onNavigate() {

        console.log(HashRouter.routeParams);

      }
    },
    {
      hash: '#/sample-external-page',
      viewId: 'External-page',
      contentUrl: 'resources/external-pages/index.html',
      resources: {
        scripts: ['resources/external-pages/script.js'],
        styles: ['resources/external-pages/style.css']
      },
      onContentLoad() {

        document.querySelector('#Internationalized_URL')
        .insertAdjacentHTML('afterend', '<br><b><i>This text was set dynamically :)</i><b>');
      }
    },
    {
      hash: '#/License',
      viewId: 'License',
      contentUrl: 'LICENSE'
    },
    {
      hash: '#/gallery/{}/{}/',
      viewId: 'gallery',
      contentUrl: 'resources/external-pages/gallery.html',
      resources: {
        scripts: ['resources/external-pages/script.js']        
      }
    },
  ]
}

HashRouter.init(config);
