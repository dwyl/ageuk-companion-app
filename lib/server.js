require('env2')('config.env');

// server instance
const Hapi = require('hapi');
const server = new Hapi.Server();
const port = process.env.PORT || 4000;

// plugins
const Inert = require('inert');
const Vision = require('vision');

// custom plugins
const ClientList = require('./clientlist/clientlist.js');
const Resources = require('./resources/resources.js');
const Login = require('./login/login.js');
const HapiLoginConfig = require('./login/hapiLoginConfig.js');
const plugins = [
  Inert,
  Vision,
  HapiLoginConfig,
  ClientList,
  Resources,
  Login
];

server.connection({ port });
server.register(plugins, (err) => {
  if (err) { throw err; }

  server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: '../public/views',
    layout: 'default',
    layoutPath: '../public/views/layout',
    helpersPath: '../public/views/helpers',
    partialsPath: '../public/views/partials'
  });

  server.start((err) => {
    if (err) { throw err; }
    console.log('server is listening on port: ' + server.info.port);
  });
});

module.exports = server;
