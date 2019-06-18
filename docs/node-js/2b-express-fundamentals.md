# The Practical Guide to MEAN Stack Development

*Fundamentals of Express*

## 2b. Using Packages and Express

*Delving into the wonderful world of packages and exploring what [Express](https://expressjs.com/) can do for us...*

### Installing Packages

We've covered off in earlier lessons what *Node.js* is, and some of the helpful tools that come with it; like it's in-built set of libraries and the ***npm*** tool.

#### The "NPM"

"NPM" is a *bit* of a synonym in the Node universe; it could refer to the **command-line tool installed with Node.js** or the public catalog of open-source software at [https://www.npmjs.com](https://www.npmjs.com).

One uses the command-line tool to install packages from the public repository into their workspace so the two are certainly related and work in concert.

There are a few of different contexts in which you can install packages; the most important of which to cover at this point are *dependency* and *globally*.

A *workspace* refers to a folder/directory that keeps a self-contained node project as illustrated by the workspaces in *examples*.

#### Installing Packages

The most straight-forward installation is installing a package as a dependency, in a workspace.

Using your terminal, change your working directory now to the example workspace included called `installation-playground`.

Let's try it out and install a public package called **Express** in that workspace:

```
> npm install express
```

It takes a moment; but *npm* command-line tool has gone to npmjs.com and downloaded the latest published version of *Express* for us and made some changes to the workspace:

The first obvious change is that *installation-playground* workspace had no **node_modules** folder; so this was created for us before *Express* was installed there.

The `package.json` file that was pre-included got it's nested `dependencies` property-table updated with the package we installed and it's version

*before*

```
{
    "dependencies": {
    }
}
```

*after*

```
{
    "dependencies": {
        "express": "^4.17.0"
    }
}
```

Congratulations, this is a very common package installation pattern!  It's super worth-pointing out; that one can simply run `npm install` (actually this can be further abreviated to just `npm i`) from a workspace containing a `package.json` with a pre-filled dependency manifest; and all the packages listed in that table will have their specified versions installed.

##### Global Packages

Some packages are designed to be helpful agnostic of their workspace (or create a new workspace altogether!) and are best installed *globally*.

Installing a package globally does make modifications to the **global workspace** (stored out of the way in you home-directory) but usually not in the workspace you're developing in.

Let's install a *global package* (a package is a package, this one is a great example of one commonly installed globally) **express-generator**:

```
> npm install express-generator -g
```

The magic is in the `-g` switch we provided to **npm**, it knows to make any binaries it provides available to `PATH`; and it *would* also allow you to reference a package in a workspace where it doesn't *actually* exist (not a very good practice for portability and containerization as you'll soon discover) which can be useful in some contexts.

In the case of the [express-generator](https://expressjs.com/en/starter/generator.html), this is a Node.js package we can run anywhere to generate a new project workspace with a fully started express application.  Let's put it to use and re-create the **shoe-catalog-api** example in express.

1. Choose a folder to create your new workspace in, open a terminal from this directory
2. `express  shoe-catalog-express` *generates a new workspace with a complete ready-to-start express application*
3. `cd  shoe-catalog-express` *move your terminal's present-working-directory to the workspace; feel free to examine the generated **package.json***
4. `npm install` (or just `npm i`) *this installed **express** library amongst others in your project*
5. `npm start` *this starts your new application*
   1. `[ctrl]+c` *exit your application*

##### Developer Workflow

So you've learned to use **npm** to install packages; globablly and locally and you've installed the express-generator and generated an express application.  You can generate APIs and code very quickly; you sure are cooking with gasoline!

There are other things that **npm** can do, and other packages offered that improve our lives as developers however.

###### Tasks

We've already covered the most fundamental way to *start* a node application; by invoking the **node** binary and passing a script; let's keep that in mind and review the **package.json** that **express-generator** created for us when it scaffolded our new project:

```
{
  "name": " shoe-catalog-express",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}
```

Look at the `scripts` property and check out the `start` entry: this is a task, and it's what gave context to the command we ran from the workspace, `npm start`.  We can see that it is invoking the **node** runtime and passing a script called **www** located in the *bin* folder.

We could create our own task entries here; and we'd have a shortcut command at our fingertips while using this workspace.

###### Nodemon

If you've been experimenting with the generated code, the first thing you might have noticed is that you have stop and restart your application to see the affect of the changes you made (the code as it was when the **node** runtime was invoked is still running in memory even after you edit the file).

How irritating... now, there is a special package available that monitors changes in your workspace and restarts your application automatically called [nodemon](https://www.npmjs.com/package/nodemon).  Let's update the project so that we can work faster.

1. `npm install nodemon -D` *don't skip the `-D` switch!*
2. Edit the workspace's **package.json** as indicated:
   1. Add a new task entry in `scripts`; let's call it `dev`
   2. `...,"scripts":{...,"dev":"nodemon ./bin/www"}`
3. `npm run dev`

Now as you change the code you notice the app restarting in your terminal; much faster than manually starting / stopping.

You may also have noticed you installed a package giving you a new command, **nodemon** which is used similarly to **node**.

"Why not just run `npm install nodemon -g`?", you ask; and it's a great question.

1. You can do that; and it may be beneficial to you if you use nodemon frequently to do so
2. We didn't do that; we installed with `-D`... why?
   1. Look at your updated **package.json** after installing nodemon, notice that it's not in *dependencies* table but rather in *devDependencies*
   2. *devDependencies* don't get installed [transitively](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
   3. Installing with `-D` flags the module as required for dev workflow; but distinguishes the module as not being a *run-time* dependency
   4. This software doesn't need nodemon to run; we want to ensure that our workspace has it available for developers to use since we've added a task they can run dependant on it.
   5. We don't want to have to rely on the end-developer to have installed **nodemon** globally for our task to work

We covered off a third package installation context (the "dev" dependency) and learned to write **npm** tasks all in one shot!

### Disecting the Express Application

We've already got a pretty solid REST api in **shoe-catalog-api** right?  So what does *express* add for us?  Well, simply put a lot:

* A "route-matching" pattern we can use to map our handlers to specific URI requests
* An MVC framework for further piping our request handlers to templated HTML output
* Clean short-hand access to HTTP requests and transformations:
  * Reading / writing headers
  * Writing consistent response bodies and content-types

The illustration example is designed to make you *think* about the kinds of things that *express* is doing under the hood&mdash;we get some points for creating a clean workspace allowing us to add route-handlers and process requests; we'd actually start off with quite a bit of technical debt though if we went to production with that example for a few reasons:

1. The request handling is not super-flexible; it's designed to map a URI path to a relatively placed file matched on name
2. There is only the most fundamental groundwork supporting URI and body-parsing
   1. There is mature; battle-tested code that handles all of this for us.
   2. We only wrote *middleware* that parses JSON formated request-bodies
3. It's too much code!

Let's disect the generated express app and further look at where some of the components illustrated **in shoe-catalog-api** will fit in; and how much we get out of the box with express.

#### Contrasting From 1000 Feet

Very broadly; our project structures aren't too different:

1. The original illlustration API had a folder called "assets" that could just as easily be named "public"
2. Both projects have a folder for "routes"
3. We've not written *services* in our express-generated app; but if we were to do so they'd certainly belong in a namesake folder

#### Tracing from the Entry Point

*Just to review, the **entry point** for a Node application is always `index.js` or specified by the `main` property in the root **package.json***

The simple **shoe-catalog-api** entry point is *index.js* and you'll notice some code written in our previous examples that sets the ports we want to use and starts listening for requests; we've now added code that:

* `mapHandler` *maps request handlers to requests*
* `parseUri` *parses the request URL coming in for a query-string and builds a JSON object from it*
* `parseBody` *parses the JSON format request body on a PUT/POST/PATCH method request and turns it into a JSON object*

As mentioned before; all that great stuff we added in our simple example entry point, is provided out of the box by express!  Let's look at the new entry point, *bin/www (edited for brevity)*:

```
#!/usr/bin/env node
/*
The above "shebang" line is special; it will not get executed as JavaScript; it will be interpreted by unixy systems as a directive as:
"this is a system script; process it with node, look for node in /usr/bin/env"
*/

/**
 * Module dependencies.
 */

var app = require('../app'); // Get an express application instance
var http = require('http'); // Should be familiar from the 'simple-server' example

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
// Should be familiar from the 'simple-server' example; the express application instance is one big request handler!
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) { /* ... make sure port is a number*/ }

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) { /* ... handle top-level errors in the server process as they occur */ }

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() { /* ... write a debug log of the port we're listening on */ }

```

1. The first real line in that file *requires* **app.js** in the root of the project; so for all intents-and-purposes; this file *app.js* is the *practical* entry point of your express application where you'll **configure middleware** and map routes to **handlers** that process them.
2. You should recognize the use of the internal `http` library from both simple server and our own rest API example; express rides on top that library too; and in fact an express application is no more than request handler itself.
3. Call `createServer` just like other examples, set the server to `listen` on the bound port.

### app.js

As mentioned above; *app.js* `require`'d by **bin/www** is the *practical* root of your express project as you would configure **middleware** and your **route handlers** from this file.

"Middleware" in the NodeJS world refers to code that runs "in the middle" somewhere between a request being acted on and a corresponding response.

Really; *middlware* could describe *route handlers* too since they are in-fact nothing more than middleware that process a request and a response.  While all middleware can be configured to filter requests based on various criteria, the distinction is that a route handler will generally only perform processing on requests of a specified URI route and broadly for the purposes of mapping *routes* to *business logic* and further filtering responses (i.e. perhaps one "route" is best responded too with csv or xml data).

Looking at *app.js (edited for brevity)*:

```
/** ... include middleware software (i.e. cookie-parser, morgan [refered to as "logger" below]) */
var express = require('express'); // Use the express framework...

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inventoryRouter = require('./routes/inventory');
var shoesRouter = require('./routes/shoes');

var app = express();  // Assign back an "application instance" (a.k.a the root request handler provided by express)

/** use "jade" MVC view engine and map it's templates ... */

app.use(logger('dev')); // Insert "morgan" a.k.a. the "logger" middleware; set up with a 'dev' flag in our application flow
app.use(express.json()); // This ensures we can read and write response bodies with JSON format data
app.use(express.urlencoded({ extended: false })); // This ensures we can read url-encoded request bodies (from forms etc.)
app.use(cookieParser()); // This is middleware that reads cookie headers and organizes the cookies for us
app.use(express.static(path.join(__dirname, 'public'))); // This creats a request handler that maps requests to a file in the public folder

app.use('/', indexRouter); // Use the "index" router that generator created for us; this response is an text/HTML response type
app.use('/users', usersRouter); // Pick up requests matching /users* and send them to the users router
app.use('/shoes', shoesRouter); // Pick up requests matching /shoes* and send them to the shoes router
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/** ... further protect stack traces when returning an error on a response if in production mode for security purposes */

// Export our master request handler, ./bin/www will require our express instance with all it's middleware configurations
module.exports = app;

```

1. If you look at the raw file you'll see more `require`'s for things like "morgan" and "cookie-parser".  They're the best examples of middleware&mdash;they're designed to uniformly transform all requests and value-add request-logging and cookie-header reading, respectively.
   1. You may see the middleware modules get invoked; i.e. `app.use(cookieParser())`
      1. So `cookieParser` is the middlware-*factory*, and the output of that factory is our *middleware*
      2. The result of the invocation is still a function of this form: `(request, response, next)=>{}`
2. You'll also see `require`'s for our *routes*
3. The `require`ment of express should result in the *express-factory*.  When we run the factory we'll get back the master request handler we need:
   1. i.e. `var app = express();`
4. You'll now notice a lot of resoloved `require`ments are now being `use`ed.
   1. Invoking `app.use(...)` is how we "insert" middleware.
   2. Order is important...
      1. Notice that high-level middlware with broad applicability is inserted first:
         1. Cookie parsing, logging, etc.
         2. Notice it does not have a particular route filter it protects
      2. Notice that middware resolving *anything* seems to come next; the first of which is our `app.use(express.static(path.join(__dirname, 'public')));` which maps pretty much every request to first match a file in the **public** directory.
         1. `path.join` is a NodeJS provided library that supports with cross-platform directory resolution.
      3. Now we start getting more specific and picking out paths on the URI to route for the purposes of our api:
         1. users, shoes, inventory, etc.
         2. Notice how we specify the root-prefix for these routes with a complimentary *route-matching pattern*?

### routes/shoes.js

In the "routes" folder is all the middleware specially separated for the purposes of mapping our API to the services that provide it's real value.

The best illustration is the route provided *shoes.js*

```
const shoeService = new (require('../services/shoes-service'))(); // Reequire this so we have business-logic value to provide
var express = require('express'); // Get access to the express factory;
var router = express.Router(); // Use express' Router factory and produce a new request handler we can further pass requests to

/**
 * Map URI paths and verbs to request handlers
 */
router.get('/', async function(req, res, next) {
    let result = await shoeService.findAny(req.query);
    return res.json(result);
});
/**
 * Use a path "parameter"
 */
router.get('/:sku', async function(req, res, next) {
    let result = await shoeService.findAny({...req.query, sku:req.params.sku});
    return res.json(result);
});

/**
 * Map several verbs to the "general" write routine
 */
router.post('/', generalInsertionHandler);
router.put('/', generalInsertionHandler);
router.patch('/', generalInsertionHandler);

async function generalInsertionHandler(req, res, next) {
    let result;
    try {
        result = await shoeService.upsert(req.body, req.query);
    }
    catch (problem) {
        next(problem)
    }
    return res.json(result);
}
module.exports = router;
```

1. Notice the agnostic reference to our route path; we don't know we're "shoes" and we can be re-mapped from the app.js very easily
   1. `router.get('<path-match-pattern>', <middleware handler>)` where `<path-match-pattern>` is relative to the *prefix* argument we pass to express when we `use` this route
2. Notice we mapped the same 'generalInsertionHandler' routine to all three HTTP verbs `PUT`, `POST`, `PATCH`.
   1. Router provides short-hands that map handlers to requests with particular verbs:
   2. Follows this pattern: `router['<http verb>'.toLowerCase()](<path-match-pattern>,<handler>)`
3. Notice `router.get('/:sku', async function(req, res, next) {...`
   1. The path parameter, **sku** in the `<path-match-pattern>`.
      1. A path match pattern like `:sku` will result in the real value in that URI path being passed on `req.params.sku`
         1. `router.get('/:<parameter>)` ➡ `{params:{"<paramter>":<parameter value>}}`
4. Notice that inside `generalInsertionHandler`, we're able to read the JSON format request body from our request on `req.body`

## Summing it Up

Notice that what *didn't change* was our simple service layer; after getting a high-level overview of the ins-and-outs of request handling with NodeJS; we're beginning to be real *MEAN* stackers now that we have a quick and concise framework for streamlining and converging filtering logic on requests and further segmenting and delegating *where* requests go for more processing based on their request details, and more-often-than-not based on their original URI request path.
