const Hapi = require('hapi');
const port = process.env.PORT || 4000;
const Joi = require('joi');
const HapiLogin = require('hapi-login');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({
  port: port
});

const customFields = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
};

const loginHandler = (request, reply) => {
  const email = request.payload.email;
  const password = request.payload.password;
  if (email === process.env.FAKE_EMAIL && password === process.env.FAKE_PASSWORD) {
    reply('GREAT SUCCESSSSS!!');
  } else {
    reply('you failed');
  }
};

const options = {
  fields: customFields,
  handler: loginHandler,
  loginPath: '/hapilogin'
};

const Login = require('./login/login.js');
const plugins = [ Inert, {register: HapiLogin, options: options}, Login ];

server.register(plugins, (err) => {
  if (err) { throw err; }

  server.start((err) => {
    if (err) { throw err; }
    console.log('server is listening on port: ' + server.info.port);
  });
});
