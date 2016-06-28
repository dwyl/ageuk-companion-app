exports.register = (server, options, next) => {
  server.route({
    path: '/',
    method: 'GET',
    config: {
      description: 'dashboard view',
      handler: (request, reply) => {
        reply.file('./public/dashboard.html');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'view for dashboard'
};
