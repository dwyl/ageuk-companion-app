exports.register = (server, options, next) => {
  server.route({
    path: '/login',
    method: 'GET',
    config: {
      description: 'the companion login view',
      handler: (request, reply) => {
        reply.file('./public/views/login.html');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'hapi login system'
};
