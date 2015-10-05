<<<<<<< HEAD
[![Stories in Ready](https://badge.waffle.io/Ambiguous-Cicada/Ambiguous-Cicada.png?label=ready&title=Ready)](https://waffle.io/Ambiguous-Cicada/Ambiguous-Cicada)

# Kwiki

Kwiki is a mobile chat app that brings closeby users together.

[API Documentation](APIDOCS.md)

## Original Kwiki Team

  - __Product Owner__: Daniel O'Leary
  - __Scrum Master__: JT Knox
  - __Development Team Members__: Niraj Vora, Michael Junio, Daniel O'Leary, JT Knox

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage

### Config
The config file located at `env/config.js` contains environment variables that can be set to your requirements and `process.env.NODE_ENV` will be used to determine which set of variables will be used.
Find more information in the [API Documentation](APIDOCS.md).

### Server
The server is in NodeJS and is configured to start with `node server/server.js` or simply `npm start` from the root directory.

### Client

### API Keys

API keys are all stored in `server/env/api-keys.js` and is .gitignored.
An example file can be seen in `server/env/api-keys.example.js`.
Find more information in the [API Documentation](APIDOCS.md).

## Requirements

- Node 0.12.7
- npm
- MongoDB
- Ionic

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Known bugs and issues
This project contains known bugs and issues, which can all be accessed [here]('https://github.com/Ambiguous-Cicada/Ambiguous-Cicada/issues'). Feel free to add to them.

## Contributing

See the [Contribution Guidelines](CONTRIBUTING.md) in `CONTRIBUTING.md` for a detailed explanation of our contribution protocol.
=======
# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
>>>>>>> 36bec6a8a6c517934c8ce862b31f95b75363fce5
