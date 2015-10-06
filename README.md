[![Stories in Ready](https://badge.waffle.io/Ambiguous-Cicada/Ambiguous-Cicada.png?label=ready&title=Ready)](https://waffle.io/Ambiguous-Cicada/Ambiguous-Cicada)

# Kwiki

Kwiki is a mobile chat app that brings closeby users together.

Refer to our [Documentation](DOCS.md) for internal details of our app.

## Original Kwiki Team

  - __Product Owner__: Daniel O'Leary
  - __Scrum Master__: JT Knox
  - __Development Team__: Niraj Vora, Michael Junio, Daniel O'Leary, JT Knox

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

### API Keys and public DB_URI

The Google geocoding API-key and the public Mongo-lab URI are all stored in `.env`, which is `.gitignore`d.
The variables in `.env` can be manually added to the production server with `$ heroku config`. To access the the `.env` file with `process.env` in development mode, you must start the development server with `$ heroku local`.

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
This project contains known bugs and issues, which can all be accessed [here](https://github.com/Ambiguous-Cicada/Ambiguous-Cicada/issues). Feel free to add to them.

### Potential new features
- Geolocation using device GPS
- Location based restaurant/bar suggestions
- Post emoji, images, video, location, etc
- Allow multiple chats per client
- Group chats with more than two users

## Contributing

See the [Contribution Guidelines](CONTRIBUTING.md) in `CONTRIBUTING.md` for a detailed explanation of our contribution protocol.
