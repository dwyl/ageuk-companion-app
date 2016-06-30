// TODO: fetch data from local storage
var clients = {
  one: 'Anne Onymous',
  two: 'Miss Terry',
  three: 'Mrs Merton'
};

function renderHtml (sourceName, context) {
  var source = document.getElementById(sourceName).innerHTML;
  var template = Handlebars.compile(source); // eslint-disable-line
  return template(context);
}

function renderToDOM (targetName, sourceName, context) {
  var target = document.getElementById(targetName);
  target.innerHTML = renderHtml(sourceName, context);
}

renderToDOM('target', 'client-list', clients);
