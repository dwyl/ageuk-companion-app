exports.register = (server, options, next) => {
  server.route({
    path: '/add-client',
    method: 'GET',
    config: {
      description: 'the add client view',
      handler: (request, reply) => {
        reply.file('./public/views/addclient.html');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'add client view'
};
