# The Practical Guide to MEAN Stack Development

*Fundamentals of Express*


## 3 Packages

*Expanding from foundations of Node.js and delving further into packages; dependency scenarios; Yarn package manager extension; and package development.*

By this point we're not unfamiliar with a typical Node.js package anatomy; we know what *package.json* is; how to generate one; and that it stores metadata about our code.

### Dependencies

We've covered in previous [sessions](/2b-express-fundamentals.md) *installing packages* in your workspace and brought up the concept of a *dependency* without fully delving into it.

When you install any dependency; the **package.json** in the root of your project has a sub-graph of the structure updated indicating the dependency that package has on another.

For reference; checkout the **package.json** from [shoe-catalog](../examples/shoe-catalog/package.json)

```
{
  "name": "shoe-catalog",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.0"
  }
}

```

We covered off using the **npm** *command-line-interface* to install packages; for example we could've entered in our terminal:

```
npm install express
```

We could've also achieved the same effect by manually editing the *package.json* with the dependency and simply entering `npm install`

***TIP:** you can use `npm i` as a shorthand for `install`*

When installing dependencies; Node.js uses the [semver](https://docs.npmjs.com/about-semantic-versioning) spec and you can specify version dependencies with that syntax to control compatibility ranges and allow your software to benefit from patch security releases without automatically installing dependencies that introduce breaking changes.

#### Run-time Dependencies

The most common dependency is a *run-time* dependency; they're always listed under the `dependencies` graph of the package.json.

Simply put run-time dependencies (seldom distinguished as "run-time" and simply "deps") contain functionality you need for your code to actually run.

#### Dev Dependencies

*Development* dependencies; as illustrated in our example by *nodemon*&mdash;provide functionality useful for *developing* the software in the package; but unnecessary to use the sofware in the package.

Another important distinction of dev dependencies is that they are *not installed transitively*, the effect of which is the dev-dependencies' own dependencies on an individual basis are sandboxed.

For a practical example of this; open the *node_modules* folder where all of our packges are physically installed for the **shoe-catalog** app: inspect the installation forlder for *express* installed **transitively** and notice it **does not** have it's own *node_modules* folder; but rather depends on the other packages in the *node_modules* folder your looking (containing as you no doubt notice; many more packages than listed as direct dependencies in our package.json).

In contrast; checkout the *dev-dependency nodemon* (which we just use to monitor code changes to a running app and update the process in memory if you remember; not something terribly useful in deployed production as you can imagine).  It has **it's own node_modules** directory.

Now every package within a dependency model can further have it's own dependency on a different version of an upstream module; so you could pick through transitive dependencies of our package and further find examples of packages with their own *node_modules* folder because they need a "sandboxed" reference to dependencies.

Another important distinction about dev dependencies; is that they do not get installed when `npm install` is run with the `--production` flag.

#### Peer Dependencies

Peer dependencies; (we don't have an example to draw on yet; but we'll get there) without getting deeper than we need to; are a way to specify that "this package; when considered as a dependency; presumes you also have package **X@version** installed as a dependency of your project".

While the peer dependency is "run-time" in nature; as illustrated above with both "dev" and regular depenencies that have a more specific version requirement of a common-library; a peer dependency is going to end up installed in it's dependee's sandboxed *node_modules* folder; but npm will throw a warning that the dependency of that package is incorrect (or missing) upon installation.

Peer dependencies *used to get installed* (in their workspace) in older versions of *npm* but are not in contemporary versions when typing `npm install`.

There is no **command-line-interface** flag to install a package as peer with **npm**!  You must manually edit the package.json.

#### Further Reading

* [Best Stack Overflow Answer: What's the difference between dependencies, devDependencies and peerDependencies in npm package.json file?](https://stackoverflow.com/a/22004559)
* [Understanding the npm dependency model](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)

### Package Development and Writing Express Middlware

Let's take a more practical look at *package development* by following an example "middleware" recipe illustrated in the [express guide](https://expressjs.com/en/guide/writing-middleware.html).

#### The Middleware

Observe the example [shoe-catalog-middleware](../examples/shoe-catalog-middleware/index.js):

```
function logHeaders (req, res, next) {
    console.log(req.headers);
    next();
}
module.exports = logHeaders;
```

Pretty light on code; but without totally reviewing **express middleware**, which captures requests; does something with that info and then hands-off to the next piece of middlware&mdash;this totally illustrates that pattern.

The above example simply logs the headers to the console for every request, then passes off to the next middlware.

#### The Peer Dependency in Practice

Now observe the [package.json](../examples/shoe-catalog-middleware/package.json):

```
{
  "name": "shoe-catalog-middleware",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "peerDependencies": {
    "express": "^4.*"
  }
}
``` 

Notice we've specified a *looser* requirement on express; we'll presume our middleware will work with **any minor or patch version 4** of express.

We've also specified this as "peer" meaning; "I (the package described in this *package.json*) am a dependency in a project; and so is **express**.

If we try to install this middleware in a future version of express that maybe has a different middleware pattern; we'll get a warning when doing so.

Let's use a terminal in the working directory of our **shoe-catalog** app and add our middleware as a dependency of that project along with *morgan*, *express*, et al.

```
npm i ../shoe-catalog-middlware
```

Yes, you can install packages in a workspace by specifying a path to another package (in fact there are a lot of ways to source packages as described in the [npm documention](https://docs.npmjs.com/cli/install))

Observe the changes to the project's *package.json*:

```
{
  "name": "shoe-catalog",
  ...
  "scripts": {...},
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    ...
    "shoe-catalog-middleware": "../shoe-catalog-middleware"
  },
  "devDependencies": {
    "nodemon": "^1.19.0"
  }
}

```

Let's *use the middlware* by edting [app.js](../examples/shoe-catalog/app.js):

```
...
app.use(cookieParser());
app.use(require('shoe-catalog-middleware'));
```

The effect of the middlware can be seen when the project is run and an example HTTP call is made:

```
$ node ./bin/www
{ 'user-agent': 'vscode-restclient',
  'accept-encoding': 'gzip',
  host: 'localhost:3000',
  connection: 'close' }
GET /not-there 404 914.512 ms - 1522
```

### Linking

In the example middleware above; we installed a package from a local source as a run-time dependency.

The source of the package aside; what if you needed to develop that middleware for some reason?  Well you'd have to make those edits and *reinstall* your source package in the host workspace again.

What if your source package were published?  How would you test your work in a downstream project dependant on your work locally?  All of these complications can be absolved by "linking".

We can try it out now with the example we have; from a terminal in *shoe-catalog-middleware* app's source workspace; type in this command:

```
npm link
```

In my particular case; I got this output:

```
C:\Program Files\nodejs\node_modules\shoe-catalog-middleware -> C:\Users\gcrawford\practical-guide-to-mean-stack\examples\shoe-catalog-middleware
```

It indicates to me I have a "global" package installed pointing at my local workspace location.  Just to further prove things out, here is the result of a *windows dir* on that path:

```
C:\Users\gcrawford\practical-guide-to-mean-stack\examples\shoe-catalog-middleware>dir "C:\Program Files\nodejs\node_modules"
 Volume in drive C is Windows
 Volume Serial Number is 4041-F33C

 Directory of C:\Program Files\nodejs\node_modules

06/14/2019  12:01 PM    <DIR>          .
06/14/2019  12:01 PM    <DIR>          ..
06/07/2019  01:21 PM    <DIR>          express-generator
04/05/2019  03:25 PM    <DIR>          npm
06/14/2019  12:01 PM    <JUNCTION>     shoe-catalog-middleware [C:\Users\gcrawford\practical-guide-to-mean-stack\examples\shoe-catalog-middleware]
               0 File(s)              0 bytes
               5 Dir(s)  108,543,287,296 bytes free
```

You'll notice the **global** packages we installed when we first discussed the concept in our earlier sessions, as well as a *junction* (if you use Windows) named as per our package name in the package.json of our linked pagage's workspace. (On linux or mac this wouuld be unixy equivalent sym-link)

Now let's work out of our *shoe-catalog* app directory again; the way **global** packages resolve, Node.js provides them to running code requiring them where they are not installed in *node_modules* for that package.  Since we do want to maintain the dependency graph integrity and the entry in our package.json of the requirement for *shoe-catalog-middlware* (which is installed) we need a way to tell node to override that and use the linked package...

```
npm link shoe-catalog-middleware
```

After running the above; start your app again and then make a minor alteration to our middleware:

[shoe-catalog-middleware](../examples/shoe-catalog-middleware/index.js):

```
function logHeaders (req, res, next) {
    console.log("Version 2..."); // Added for illustration
    console.log(req.headers);
    next();
}
module.exports = logHeaders;
```

Voila!

```
Version 2...
{ 'user-agent': 'vscode-restclient',
  'accept-encoding': 'gzip',
  host: 'localhost:3000',
  connection: 'close' }
GET /not-there 404 21.552 ms - 1522
```

***TIP: nodemon is **not** watching our middleware source directory; so if you ran your project with npm run dev; you'd still have to restart the project; or alter a source file in that project*

When finished testing alterations in the middleware source; we can of course enter:

```
npm unlink shoe-catalog-middleware
```

to return to referencing the *installed* version of that dependency.


### Yarn

Without really passing on an opinion of **npm**'s (the package manager tool) resolution of packages and management of interdependencies; there came deep improvements on package-dependency design that either make for less or discourage duplication of functionaility by versioning; to both speed up installation of dependant packages and/or absolve the complexity of shared dependencies between two packages; and possible specific patch versions of such that cause a failure in one but not all other packages that compose a working peice of software.

Enter **[yarn](https://yarnpkg.com/en/)**; an *alternative command-line-interface* to **npm**; developed primarily by Facebook.

#### Why use it?

Although very contemporary versions of **npm** *do install your packages using a more optimal multi-threaded routine*, t'was not always so and Yarn's first appeal to developers was it's speed and ability to come to deep package resolutions faster and install them in *parallel*

It also offers additional flexibility and opinionation about how your project's dependencies are structured and can audit dependency ranges down to "[flat](https://yarnpkg.com/en/docs/package-json#flat-)" dependency graphs where no package is ever consumed in more than one version.

#### What's Different?

*Very broadly; yarn is desgiend to work the same way **npm** does and supports most of it's aliases and synopses* but from a thousand feet:

* The same "custom" *npm* task you invoke as so: `npm run my-custom-task` can be invoked as so in yarn `yarn my-custom-task`
* Yarn **does not support** the `install <package>` synopsis; you must use the `yarn add <package>@version` to acheive the same result
  * `yarn install` without package specification still does the same thing as `npm install`
* Yarn **does** have a command line option for specifying a peer-dependency (`--peer`/`-P`); `yarn add express@^4.* -P` for example would have made the edit we needed in our middleware example