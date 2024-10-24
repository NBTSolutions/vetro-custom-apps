import { createServer } from 'http';
import handler from 'serve-handler';

const server = createServer((request, response) => {
  const origin = request.headers.origin;

  response.setHeader('Access-Control-Allow-Origin', origin || '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', 'true');

  return handler(request, response, {
    public: 'dist',
  });
});

server.listen(8801, () => {
  console.log('Running at http://localhost:8801');
});
