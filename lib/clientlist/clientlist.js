exports.register = (server, options, next) => {
  server.route({
    path: '/',
    method: 'GET',
    config: {
      description: 'client list view',
      handler: (request, reply) => {
        reply.view('clientlist');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'view for client list'
};
