const Hapi = require('hapi');
const port = process.env.PORT || 4000;
const HapiLogin = require('hapi-login');

const server = new Hapi.Server();
server.connection({
  port: port
});

const Login = require('./login/login.js');
const plugins = [ HapiLogin, Login ];

server.register(plugins, (err) => {
  if (err) { throw err; }

  server.start((err) => {
    if (err) { throw err; }
    console.log('server is listening on port: ' + server.info.port);
  });
});
