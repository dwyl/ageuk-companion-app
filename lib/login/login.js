const Joi = require('joi');
const Bcrypt = require('bcrypt');

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

exports.register = (server, options, next) => {
  server.route([{
    path: '/login',
    method: 'GET',
    config: {
      description: 'the companion login view',
      handler: (request, reply) => {
        reply.file('../../public/index.html');
      }
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'hapi login system'
};
