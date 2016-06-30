const tape = require('tape');
const server = require('../../lib/server.js');

tape('server should start', (t) => {
  t.plan(2);

  server.inject({ url: '/login', method: 'GET' }, (res) => {
    t.ok(res, 'server responds');

    const actual = res.statusCode;
    const expected = 200;
    t.equals(actual, expected, 'server responds with 200 status code');
  });
});

tape('server should handle static assets', (t) => {
  t.plan(2);

  server.inject({ url: '/src/style.css', method: 'GET' }, (res) => {
    const actual = res.headers['content-type'].includes('text/css');
    t.ok(actual, 'style.css received correctly');
  });

  server.inject({ url: '/src/js/main.js', method: 'GET' }, (res) => {
    const actual = res.headers['content-type'].includes('application/javascript');
    t.ok(actual, 'main.js received correctly');
  });
});

tape('teardown', (t) => {
  server.stop((err) => {
    if (err) console.log('Termination error: ' + err);
  });
  t.end();
});
