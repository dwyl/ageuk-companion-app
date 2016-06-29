const Joi = require('joi');

const fields = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
};

const handler = (request, reply) => {
  const { email, password } = request.payload;
  if (email === process.env.FAKE_EMAIL && password === process.env.FAKE_PASSWORD) {
    reply('good credentials');
  } else {
    reply('bad credentials');
  }
};

module.exports = {
  register: require('hapi-login'),
  options: { fields, handler }
};
