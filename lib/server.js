require('env2')('config.env');

// server instance
const Hapi = require('hapi');
const server = new Hapi.Server();
const port = process.env.PORT || 4000;

// plugins
const Inert = require('inert');

// custom plugins
const ClientList = require('./routes/clientlist.js');
const Resources = require('./resources.js');
const Login = require('./routes/login.js');
const AddClient = require('./routes/addclient.js');
const HapiLoginConfig = require('./hapiLoginConfig.js');
const plugins = [
  Inert,
  HapiLoginConfig,
  ClientList,
  AddClient,
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
