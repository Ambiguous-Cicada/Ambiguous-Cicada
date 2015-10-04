# Kwiki API Documentation

## Table of Contents

1. [Server](#server)
  1. [Server.js](#server.js)
  1. [Database](#database)
  1. [Authentication](#authentication)
  1. [Utilities](#utils)
  1. [Matching](#matching)
  1. [Chat](#chat)
  1. [Config](#config)
  1. [API Keys](#api-keys)
1. [Client](#client)

## Server

### Server.js
```
server/server.js
```
This file contains all HTTP and Socket.io routing. It is the starting point of all external requests.
##### User Object
*user*: *object*
  a user object that must contain the following properties:
    *id* : *string*, ObjectId of the MongoDB document underlying the user
    *name* : *string*, name of the user
  properties required by coordMatcher:
    *address* : *string*, address of the user

### Database
```
server/db.js
```
Database initialization and configuration is handled by this module. It is required by the Auth and ChatModel modules.
The path to the database can be configured in the [config file](#config).

### Authentication
```
server/auth/
```
--- REFACTOR INTO TWO FILES

### Utilities
```
server/lib/utils.js
```
--- REALLY ONLY HANDLES SESSION STUFF - REFACTOR

### Matching
```
server/match
```
The process by which users are matched to eachother for chatroom creation. The matching system is interfaced by Match Controller and the heart of the matching logic is contained in the Match Model. The Match Model will use a Matcher to match users. This implementation of Kwiki utilizes the Coordinate Matcher, however other Matchers may be used in its place.
#### Match Controller
```
server/match/matchController.js
```
This module is the interface of the matching system.
##### matchController.add(*user*, *callback*)
Kickstarts the matching mechanism for the user.
1. Appends the callback function to the user object.
1. Adds the user to the lobby.

**user**: *object*, a [user object](#user-object)

**callback**: *function*(*chatRoomId*)
  a callback function that is invoked with a chatroom identifier as the argument:
    *chatRoomId*: *string*, identifies the chatroom that the user was matched into

##### matchController.remove(*user*)
Removes user from matching process before user is matched.
- Yet to be completely implemented.
**user**: *object*, a [user object](#user-object)

#### Match Model
```
server/match/matchModel.js
```

#### Coordinate Matcher
```
server/match/coordMatcher.js
```

### Chat
### Config
### API Keys

## Client
