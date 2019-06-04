#### Node.js as a Server

Pretty cool that you can write JavaScript and use it outside of the browser right?  Let's put it to use creating a simple server.

In this example we're going to use `require` to load external code to help us work with *http requests*.  Because it's not a script we provide, there is no `./...` specifying this script in our current-working directory since it isn't there.

The `require('http')` rather loads the internal **Node.js [http](https://nodejs.org/api/http.html)** module and assigns it to our `Http` constant.

1. Create a folder called `simple-server` where we'll write our server code
2. In the **simple-server** directory, create a *package.json* as illustrated below:
3. In the same directory,create a *simple-server.js* script as illustrated below:
4. Start your server by running: `node simple-server` in your command prompt.
5. Using *your favorite REST Client* (i.e. Postman or if you're using VS Code, I'd recommend this aptly named[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension), send any request to `http://localhost:3000` to see your server in action:

**package.json**

```
{
  "name": "simple-server",
  "version": "1.0.0",
  "description": "A simple http request handler",
  "main": "simple-server.js"
}

```

**simple-server.js**

```
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

```

You should've seen a server response in your rest-client like so:

```
HTTP/1.1 200 OK
Date: Mon, 22 Apr 2019 19:13:02 GMT
Connection: close
Content-Length: 20

Hello Node (Server!)
```

Pretty cool right!?  You're already ready to start cranking out APIs!  While this example is great for illustrating *how* Node.js can handle **http requests**; most backend software is commonly written in a framework like [Express](https://expressjs.com/) or [NestJs](https://nestjs.com/) which abstracts the code you wrote and provides attional support for serializing data, setting headers, and handling URI routes amongst others.

##### Recapping Node.js as a Server

1. Node.js is commonly used to write backend software
2. When requiring platform provided modules (APIs that ship with node) simply specify the library name (i.e. `require('http')`)
3. While there are *faster* ways to develop server software; they fundamentally rely on platform modules and structures like [http](https://nodejs.org/api/http.html), [https](https://nodejs.org/api/https.html), [http2](https://nodejs.org/api/http2.html), etc.
