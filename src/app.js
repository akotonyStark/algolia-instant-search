const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'UORHJCOG49',
  '74fb98e8049e4753ce230f010774b425'
);

const search = instantsearch({
  indexName: 'space-centers',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
  <p>{{#helpers.highlight}}{ "attribute": "planet_code" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.configure({
    facets: ['*'],
    maxValuesPerFacet: 20,
  }),
  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    fallbackWidget({ container, attribute }) {
      return instantsearch.widgets.refinementList({
        container,
        attribute,
      });
    },
    widgets: [],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
