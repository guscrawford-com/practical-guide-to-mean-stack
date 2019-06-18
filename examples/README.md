# 🎯 Examples

## my-module

Expands on [my-script.js](#my-script-js) and illustrates `require` and `export`.

----

## shoe-catalog-api

*An under-the-hood look at how a REST API get's implemented in Node.js*

This example project comprises a microservice allowing access to a shoe catalog / inventory.

* 📂 assets
  * 📂 data *contains a .json file we load as a set of shoes that exist in the world (our domain model)*
  * 📂 images *contains images of shoes in the .json*
* 📂 **routes** *contains files named for all the **routes** we expose in our API*
  * 📄 inventory.js *maps HTTP verbs and paths to the **inventory-service***
  * 📄 shoes.js *maps HTTP verbs and paths to the **shoes-service***
* 📂 **services** *contains files providing the **value** and **data** we expose in our API*
  * 📄 generic-repo-service.js *provides a base-class "repository" and elemental filtering system we can use to derrive more specific data-repos for*
  * 📄 inventory-service.js *provides inventory related **business-value***
  * 📄 shoes-service.js *provides **shoe** related data and value*
* 📂 test *contains files for testing our API*
  * 📄 shoe-catalog-api.http *a script setup with details you need to test your API calls with the [VS Code Rest-Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)*
* 📄 index.js *an elaboration on `simple-server.js` extended to allow us to handle "routes", URL paths and query-strings in the `routes` folder* (application root)
* 📄 package.json *redundantly defines the root of this application; this project has no dependencies; start this project by running `node ./` from the root of the project*


----

## simple-server

*Get your feet wet writing http servers.*

[simple-server.js](simple-server.js) illustrates the most fundamental *server-listener* and *request-listener* patterns.


```
function requestHandler (request, response) {
    /* process request; update response */
}

function serverListener (err) {
    /* bind a port and spawn streams with `requestHandler` */
}
```

*Install the [VS Code "REST Client"](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to make the most of **test-simple-server.http***

---

## my-script.js

Elemental illustration of a node-executable JavaScript for the first session.

----