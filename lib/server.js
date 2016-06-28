require('env2')('config.env');

// server instance
const Hapi = require('hapi');
const server = new Hapi.Server();
const port = process.env.PORT || 4000;

// plugins
const Inert = require('inert');

// custom plugins
const Dashboard = require('./dashboard/dashboard.js');
const Resources = require('./resources/resources.js');
const Login = require('./login/login.js');
const HapiLoginConfig = require('./login/hapiLoginConfig.js');
const plugins = [
  Inert,
  HapiLoginConfig,
  Dashboard,
  Resources,
  Login
];

server.connection({ port });
server.register(plugins, (err) => {
  if (err) { throw err; }

  server.start((err) => {
    if (err) { throw err; }
    console.log('server is listening on port: ' + server.info.port);
  });
});

module.exports = server;
