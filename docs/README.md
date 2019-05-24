# The Practical Guide to MEAN Stack Development

*Fundamentals of REST API Development*

## 2. This is a REST API

In the first session's ["Node.js as a Server"](./node-fundamentals/README.md#Nodejs-as-a-Server) module; we explored how we can handle HTTP requests with node with the out-of-the-box libraries that ship with the Node.js platform, namely `http`.

### RESTfully Handle Data

Building on that simple example where we feedback a text `"Hello world"` response to any request input on any method; let's consider an example use-case where we need a centralized web-service to look up and feeback data about a set of products, like shoes and inventory&mdash;based on some querying parameters.

Without being a fully devoted lesson on [RESTful](https://www.mulesoft.com/resources/api/restful-api) concepts and all a **good REST API**'s tenets; let's come to the conclusion that *REST* means "**Re**presentative **S**tate **T**ransfer" and it's an architecture style for manging *state* within the *stateless* context of HTTP protocol.

We can be sure we want a **publically** available (fitting with client-server design), **stateless** service with a uniform interface for getting data about our shoes and/or inventory (and their *state* if applicable).

To put it simply; we want to respond to HTTP requests, using their **verbs** (also refered to as *methods*) and URL routes to drill down on data or a action being requested.

#### Routing

Broadly, the URL routes (*paths*) we expose to handle requests about our data, should pluralize the core noun the route deals with; meaning that if we were exposing data about items like a **shoe** we'd conventionally provide a route `shoes`.

It's not uncommon to have a further path that specifies "one" of a set by a common key; in keeping with the shoe example this would be `shoes/2` where `2` is the primary-key (or sku as an example) of a particular shoe.

#### Methods

If you've got classical web-application experience; you're probably at least already familar with `POST` and `GET` methods; but there are additional methods we can use to determine a fundamental action being requested.

There are even more than these listed; but common HTTP verbs that a REST API reacts to are:

* GET *generally for **reads***
* POST *generally for **newly created data**, commonly conflated with **PUT** as some sort of logical "upsert"*
* PUT *generally for **updated data**, commonly conflated with **POST** as a logical "upsert" creating non-existant data and updating otherwise*
* DELETE *gernerally for **removed data***
* PATCH *generally for **partial updates** to data*
* OPTIONS *a method used to send pre-flight credentials and other metadata before making a REST call; not typically used for mapping business layer logic*

#### Implementation

There is no rigid convention for implementing your REST API although there are some proven patterns and good-practices.

Implementation of your REST API is always up to you; if you have system constraints whereby you never really *delete* data, perhaps your concerned REST API route implements `DELETE` by setting an `inactive` or `deleted` flag on the relevant data.

### An Example API

Without exploring every part of the solution in detail; the project in `examples/shoe-catalog-api` implements a very simple REST api with just Node.js and the libraries shipped with it.

* `shoes`
  * `GET` `shoes/?<query>`
    * Lists all shoes in the database
  * `GET` `shoes/<sku>`
    * Get one shoe with <sku>
  * `POST` `PUT` `PATCH` `shoes/?<query>`
    * Inserts a new shoe
    * Updates any existing shoes that match the query
  * `DELETE` `shoes/?<query>`
    * Deletes shoes that match a query

#### Some Common Workspace Parts

*Taking a deeper look at the example project the code is organized into a broad hierarchy that will hold true for various backend APIs regardless of their platform*

* ☕index.js *an elaboration on `simple-server.js` extended to allow us to handle "routes", URL paths and query-strings in the `routes` folder*
* 📂assets
  * 📁data *contains a .json file we load as a set of shoes that exist in the world (our domain model)*
  * 📁images *contains images of shoes in the .json*
* 📂**routes** *contains files named for all the **routes** we expose in our API*
  * ☕inventory.js *maps HTTP verbs and paths to the **inventory-service***
  * ☕shoes.js *maps HTTP verbs and paths to the **shoes-service***
* 📂**services** *contains files providing the **value** and **data** we expose in our API*
  * ☕generic-repo-service.js *provides a base-class "repository" and elemental filtering system we can use to derrive more specific data-repos for*
  * ☕inventory-service.js *provides inventory related **business-value***
  * ☕shoes-service.js *provides **shoe** related data and value*
* 📂test *contains files for testing our API*
  * ☕shoe-catalog-api.http *a script setup with details you need to test your API calls with the [VS Code Rest-Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)*

##### Routes

There's usually an isolated part of the project workspace particularly devoted to reacting to particular URI paths.  Ideally it's clear that the code in a file is relevant for a certain API *path* 

##### Services

Separate business logic from the particulars of mapping HTTP URI route paths; imagine offering the same "shoes" API via a *command-line* tool or very quickly swapping out / redirecting functionality from the "surface" of your API; this would be very quick work if this separation is adhered to.