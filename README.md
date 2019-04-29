# The Practical Guide to MEAN Stack Development

A living set of teaching sessions ramping broadly experienced developers up-to working speed with MEAN stack software.

*Follow the guide ["Insall Dev-tools"](./GETTING-READY.md#Install-Dev-tools) and ["Install NVM & Node.js"](./GETTING-READY.md#Install-NVM--Nodejs) for the best experience.*

## 1. This is JavaScript

You're more than likely already familar with *JavaScript* as a scripting language you can control the browser DOM with and add interactivity to your code with.

The same runtime component in *Chrome* that executes your **JavaScript** (the ["v8"](https://v8.dev/) engine) has been isolated to run  with some minor modifications on its own outside of your browser.  **This is Node.js**

### JavaScript for the Backend

Obviously; when running JavaScript with intentions to write server software; the need for access to things like the conventional browser *DOM* and *window* APIs are no longer (immediately) necessary.  Additionally; APIs for dealing with [process-management](https://nodejs.org/api/child_process.html), [streams](https://nodejs.org/api/stream.html), and [file-systems](https://nodejs.org/api/fs.html) among [others](https://nodejs.org/api/) are provided with the Node.js framework.

### Get your Feet Wet

#### Before Starting

Be sure you have:

* Installed [Node.js](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi)
* That the **node** runtime is referenced by your `%PATH%` environment variable

#### Start Node Interactively

Try out starting and using Node.js *interactively*, in your favorite terminal environment (CMD, PowerShell, bash) start Node.js with the **node** *binary* as illustrated:

```
C:\Users\me> node
>
```
\* *the above presumes you're using a **Windows** provided command terminal like "PowerShell" or "Command Prompt"*

The blank `>` indicates that the **node** run-time is waiting for you to enter a script!  Let's try out something really simple:

```
C:\Users\me> node
> console.info('Hello Node')
Hello Node
undefined
```

Congrats you just executed your first Node-code!

##### Recapping Start Node Interactively

1. You launched the **node** binary *interactively*
2. You entered a line of code `console.info('Hello Node')`
3. `console.info('Hello Node')` printed `Hello Node`, and returned `undefined` and echoed that to the output stream also

#### Write a Script for Node

Let's get a bit more practical and use the same **node** runtime to run a script we write in JavaScript.

If not already, set your *command terminal's **present-working** (or "current-working")* so it's running out of a folder in your *home-directory* (usually `C:\Users\yourname`) and create a new file in that directory called `my-script.js`.

Let's start off with the same contents we entered in *interactive* mode above:

```
console.info('Hello Node');
```

Now try invoking the **node** runtime and *passing the script we created* as so:

```
C:\Users\me> node my-script.js
Hello Node
```

##### Recapping Write a Script for Node

1. You wrote your first "node-script" or "module" `my-script.js`
2. You passed `my-script.js` to your **node** runtime and ran your script resulting in `Hello Node` being printed to the console

----

#### Node.js Workspaces & Modules

A node *module* is, at it's simplest, a loadable JavaScript (or JSON, which is technically a syntactical sub-set of JavaScript) file.

A *package* is at least one module, in a folder, with metadata about the module(s) and any *depedencies* of that package.

You've already written your first Node.js JavaScript module, and you can probably already imagine the need to work in more than one file and manage your project-workspace.

##### The Main File

While we illustrated earlier; running **node** and passing a script reference (`my-script.js`) we could also pass a *directory* path; and **node** would look for `<directory>/<path>/index.js` by default.  That's because in any **node module**, "index.js" is the *default "main" file*.

Let's create a *sub-module* for a deeper look at how you can manage a Node.js **module**.

1. Create a folder in your exisiting working directory with this command: `mkdir my-module`
2. Copy your file `my-script.js` into `my-module` and rename it `index.js`

Go ahead and prove out the default resolution of `index.js` by running this command and getting the same output as earlier:

```
C:\Users\me> node my-module
Hello Node
```

##### package.json

While we can use Node.js from any directory with a default "main" file being "index.js" to form an *implicit* package or module (not a real term) which proves our point; *node packages* always contain a **package.json** which has several purposes; but first and foremost to record metadata about a package and specify the main module.

The *package.json* is no more than a conventional [JSON](https://www.json.org/) file; and you could create this manually if you like for our purposes as so:

```
{
  "name": "my-module",
  "version": "1.0.0",
  "description": "Prints \"Hello Node\" to the console...",
  "main": "index.js"
}
```

You can **generate** a *package.json* file by running this command from the working-directory of your module: `npm init` or you can create a file in the root of your working-directory (**my-module** folder) by creating a new file called `package.json` and pasting the above contents.

As you can make out likely, we have the opportunity to override the file-name *Node.js* resolves as the "main" entry script of the package / module.  (i.e. we could rename `index.js` back to `my-script.js` and update the `package.json` contents to refer to that file as the `main` entry)

##### require and module.exports

One of the biggest paradigm shifts for developers writing JavaScript for the browser; versus those writing JavaScript for the *server* is the concept of multi-file dependency.

For the browser's part; the script loading is offloaded to the DOM; so you'll see a lot of solutions out there like [RequireJS](https://requirejs.org/) that manage script loading and scope exposure.

In the world of Node.js, the framework for loading scripts is a fundamental exposure to the Node.js environment in the form a globablly available function called `require`.

Let's proof this out a bit and create a new script in `my-module` called `hello.js` which will store the message we wish to display.  We'll reference the new file in `index.js` and display the same message with the power of the in-built `require` function.

Go ahead and edit the files as illustrated below:

**hello.js**

```
const HELLO_NODE = "Hello Node";
module.exports = HELLO_NODE;
```

**index.js**

```
const MESSAGE = require('./hello');
console.info(MESSAGE);
```

Then run your module again:

```
C:\Users\me> node my-module
Hello Node
```

Sorry to bore you; the output is the same!  But we illustrated how `require(..)` and `module.exports` work, and there's a lot of value in that!

##### module.exports

`module` is a singleton object provided globally by Node.js to any script run; the `exports` property can be assigned data and references that you intend to be exposed to another script that requires it.

So when we defined a constant `HELLO_NODE` with our data `"Hello Node"` we aceived *exporting* a module; even if it only exposed a string.

##### require

`require` is a special in-built function for Node.js that synchronously loads an external JavaScript file, executes it in place; then returns whatever was *exported*.

That is to say, in our example `hello.js` and any code in that file ran after the code `require('./hello')` and before `console.info(MESSAGE)`.

It's worth observing that when the string literal `'./hello'` was passed to `require`:

1. the `./` prefixing `hello` speficied to look for `hello.js` in the *current working directory* (the folder that **node** was invoked in).
2. one *could* write `require('./hello.js')` but this isn't necessary

##### Recapping Node.js Workspaces & Modules

1. For Node's purposes a ***module*** is any file with loadable JavaScript code (or JSON data).
2. A ***package*** is any module accompanied with a *package.json* metadata file.
3. The *main file* is the first JavaScript file loaded when a *node package* is executed by Node.js.
   1. By default, the *main file* is *index.js*
   2. You can specify otherwise in teh *package.json*
4. Package metadata is stored in the *package.json*
   1. A *package.json* file is fairly simple at it's most fundamental
   2. They can be generated with the command `npm init`
5. *Import*, *include* or otherwise *require* external JavaScript file using the method `require('./<relative-path-to-script>')`
6. To share data from a JavaScript file you intended to `require(...)` somewhere else, assign it to `module.exports`.
