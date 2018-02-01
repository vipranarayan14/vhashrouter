const config = {

  defaultRoute: '#/Intro',

  routes: [

    {
      hash: '#/Intro',
      viewId: 'Intro'
    },

    {
      hash: '#/Introduction',
      onNavigate() {

        console.log('Navigated to "Introduction".');

      },
      viewId: 'Intro'
    },

    {
      hash: '#/Usage',
      onNavigate() {

        console.log('Navigated to "Usage".');

      },
      viewId: 'Usage'
    },

    {
      hash: '#/Other-features/{}/',
      onNavigate() {

        console.log(HashRouter.routeParams);

      },
      viewId: 'Other-features'
    },

    {
      contentUrl: 'resources/pages/index.html',
      hash: '#/sample-external-page',
      onContentLoad() {

        document.querySelector('#Internationalized_URL')
          .insertAdjacentHTML(
            'afterend',
            '!!! This text was set dynamically by HashRouter !!!'
          );

      },
      resources: {
        scripts: ['resources/pages/script.js'],
        styles: ['resources/pages/style.css']
      },
      viewId: 'External-page'
    },

    {
      contentUrl: 'LICENSE',
      hash: '#/License',
      viewId: 'License'
    },

    {
      contentUrl: 'resources/pages/gallery.html',
      hash: '#/gallery/{}/{}/',
      resources: {
        scripts: ['resources/pages/script.js']
      },
      viewId: 'gallery',
    }
  ]

};

window.HashRouter.init(config);
