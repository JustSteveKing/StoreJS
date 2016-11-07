# StoreJS
A simple JavaScript localStorage wrapper library.

Each localStorage item gets stored as a 'container' which has an 'expiry' field and a 'data' field.
To create a 'container' use the following syntax:

```js
Store.create('test', {
  'year': 2016,
  'month': 11 - 1,
  'day': 06,
});
```

''Please Note'' This library requires moment.js to create a better Date wrapper around expiry dates for localStorage.

## Globals
`containers` is a global storage array, storing the names of your containers for quick management.

`container` is a global string used to store the current Storage container to make management less verbose.

## Methods
`create(containerName, expiry, data)` - a simple method to create a new Storage container. Data is nullable.

`dump(containerName)` - a simple method to completely dump a container and all of its data.

`use(containerName)` - a simple method that sets a variable called `container` to the name passed. This is used to make managing containers less verbose.

`switch(containerName)` - a similar method to `use()` however this is more for switching to a new container should you create one. or prefer this terminology.

`contaners()` - Returns all created containers as an Array (names only).

`add(data, containerName, expiry)` - Used to add data into a container. This assumes that the container has already been created. `containerName` and `expiry` are both nullable.

`empty(containerName)` - used to empty all data from a container but to kep it intact. `containerName` is nullable it will fallback to the global `container` variable if left empty.

`clean()` - a house cleaning method, used to remove any containers where the date is in the past. This utilizes moment.js and the `.isAfter()` method - so you can be as specific as needed on storage lifetimes.

`reset()` - Reset all containers. The same as calling `localStorage.clear();`.

`parse(containerName)` - A method to return the stored container as an object. `containerName` is nullable and will fallback to the global variable `container`.

`supported()` - a test method if you have problems saving to localStorage.

## Examples

### Create a container
```js
Store.create('test', {
  'year': 2016,
  'month': 11 - 1,
  'day': 06,
  'hour': 20,
  'minute': 45,
  'second': 20,
  'millisecond': 123,
});
```

### Use a container
```js
Store.use('test');
```

### Add data to a container
```js
Store.add({
  user: {
    id: 1,
    username: 'JustSteveKing',
    age: 28,
  }},
  'test', 
  {
    'year': 2016,
    'month': 11 - 1,
    'day': 06,
    'hour': 20,
  });
```

### Empty a container
```js
Store.empty('test');
```

### Clean expired containers
```js
Store.clean();
```

### Parse container
```js
Store.parse('test');
```

### Dump a container
```js
Store.dump('test');
```

### Return all Containers
```js
Store.containers();
```

## A more useful Example:

```js
$(document).ready(function() {
  setTimeout(function() {
    Store.clean();
  }, 300000);
  $.get('/route/to/get/data', function(data) {
    Store.create('users', {
      'year': 2016,
      'month': 11 - 1,
      'day': 06,
    }, data.property);
    Store.use('users');
  });
});
```
