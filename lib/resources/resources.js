exports.register = (server, options, next) => {
  server.route({
    path: '/{params*}',
    method: 'GET',
    config: {
      description: 'resource handler for static assets',
      handler: {
        directory: { path: './public' }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'static assets resource handler'
};
