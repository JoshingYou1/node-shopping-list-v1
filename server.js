
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

const {Recipes} = require("./models");

Recipes.create("chocolate milk", ["1 tsp cocoa", " 2 cups milk", "1 tsp sugar"]);
Recipes.create("pizza", ["3/4 cup pizza sauce", "1/4 ounce dry yeast", "1 cup water", "1 tsp sugar", "3 cups bread flour", 
  "1/2 tsp salt", "1 tbsp olive oil", "2 cups mozzarella cheese"]);
Recipes.create("cheeseburger", ["1/2 lb ground beef", "1 slice cheddar cheese", "hamburger bun"]);

// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get("/recipes", (req, res) => {
  res.json(Recipes.get());
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
