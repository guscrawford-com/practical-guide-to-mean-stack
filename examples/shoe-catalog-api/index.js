const PORT = 3000;
const Http = require('http');
const { join } = require('path');
const server = Http.createServer(requestHandler);
server.listen(PORT, serverListener);
/**
We'll handle requests as they come in with "routes";
evaluate that code once and save the defined functions on 
this table:
loadedRoutes = {
    shoes: function (request, response) {
        ...
    }
}
 */
let loadedRoutes = {};

/*
    Listeners borrowed from...
    https://blog.risingstack.com/your-first-node-js-http-server/

    Extended so that we can go to work quickly in the "routes" and "services" folders
*/
async function requestHandler (request, response) {
  console.info(`Request: ${request.url}`);
  try {
    // Run the right code for this URI
    let result = await mapHandler(
        parseUri(request),
        request,
        response
    );
    // If done without issue; send back a JSON result with 200/OK response
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(result);
  }
  catch (e) {
    // Always log errors
    console.error(e);
    // Send back a 500/Error and additional details of what went wrong
    response.writeHead(e.statusCode || 500, {"Content-Type": "application/json"});
    response.end(JSON.stringify(Object.assign({message:e.message},e)));
  }
}
/**
 * Our own custom "middleware" that builds an object from the url-encoded query-string and slits url paths into an array of strings on `"/"`
 * @param {Node.js Request} request The Node.js provided `request`
 */
function parseUri(request) {
    let uri = request.url.split('?');
    let paths = uri[0].split('/');
    let query = {};
    if (uri[1]) uri[1].split('&').forEach(keyEqVal=>{
        let kvp = keyEqVal.split('=');
        query[decodeURIComponent(kvp[0])] = decodeURIComponent(kvp[1]);
    });
    return {
        uri,
        paths,
        query
    };
}
/**
 * Look in `~/routes/<route-path>.js` for function to call and pass `response` and `request` with attached `query` and `paths` from the `parseUri` result onto the Node.js `request` object.
 * @param {parseUri Result} parseUri results 
 * @param {Node.js Request} request 
 * @param {Node.js Response} response 
 */
async function mapHandler({paths, query}, request, response) {
    console.info(`Handler: ${request.method} "${paths[1]}"`)
    if (!loadedRoutes[paths[1]]) try {
      loadedRoutes[paths[1]] = require(join(process.cwd(), 'routes', paths[1]));
    } catch(err) {
        console.warn(err);
        if (err.message.indexOf('Cannot find module')!==-1)
            throw notFound();
        else {
            err.statusCode = 500;
            throw err;
        }
    }
    if (!loadedRoutes[paths[1]]) throw notFound();
    let result, body;
    try{
        body = await parseBody(request);
        result = await loadedRoutes[paths[1]](Object.assign(request, {paths, query, body}), response);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    return JSON.stringify(result);
}
async function parseBody(request) {
    return new Promise(
        (resolve, reject)=>{
            var parsedBody = '';
            request.on('data', function (readData) {
                parsedBody += `${readData}`;
            });
            request.on('end', function () {
                let result;
                if (parsedBody) try {
                    result = JSON.parse(parsedBody)
                } catch (e) {
                    reject(e);
                }
                resolve(result);
            });
        }
    )
}
function notFound() {
      let notFound = new Error('Not found');
      notFound.statusCode = 404;
      return notFound;
}
function serverListener (err) {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on port: ${PORT}...`)
}
