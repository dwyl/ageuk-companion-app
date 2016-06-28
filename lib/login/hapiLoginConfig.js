const Joi = require('joi');
// const bcrypt = require('bcrypt');
const HapiLogin = require('hapi-login');

const fields = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
};

const handler = (request, reply) => {
  const email = request.payload.email;
  const password = request.payload.password;
  if (email === process.env.FAKE_EMAIL && password === process.env.FAKE_PASSWORD) {
    reply('good credentials');
  } else {
    reply('bad credentials');
  }
};

module.exports = {
  register: HapiLogin,
  options: { fields, handler }
};
