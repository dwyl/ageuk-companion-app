exports.register = (server, options, next) => {
  server.route({
    path: '/client-list',
    method: 'GET',
    config: {
      description: 'client list view',
      handler: (request, reply) => {
        reply.file('./public/views/clientlist.html');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'view for client list'
};
