const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
});

server.route(routes);

// Menerapkan CORS pada seluruh resource
server.ext('onPreResponse', (request, h) => {
  const { response } = request;
  if (response.isBoom && response.output.statusCode === 404) {
    return h.response('Not Found').code(404);
  }

  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');

  return response;
});

const start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

start();
