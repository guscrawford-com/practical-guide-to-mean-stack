const PORT = 3000;
const Http = require('http');

const server = Http.createServer(requestHandler);
server.listen(PORT, serverListener);

/*
    Listeners borrowed from...
    https://blog.risingstack.com/your-first-node-js-http-server/
*/

function requestHandler (request, response) {
  console.log(request.url)
  response.end('Hello Node (Server!)')
}

function serverListener (err) {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on port: ${PORT}...`)
}
