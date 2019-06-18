# 🎯 Examples

## my-module

Expands on [my-script.js](#my-script-js) and illustrates `require` and `export`.

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