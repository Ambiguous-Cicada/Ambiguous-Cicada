# Kwiki API Documentation

## Table of Contents

- [Server](#server)
  - [Server.js](#serverjs)
  - [Database](#database)
  - [Authentication](#authentication)
  - [Utilities](#utils)
  - [Matching](#matching)
    - [MatchController](#matchcontroller)
    - [MatchModel](#matchmodel)
    - [Matcher](#matcher)
    - [Coordinate Matcher](#coordinate-matcher)
  - [Chat (Server)](#chat-server)
    - [ChatModel](#chatmodel)
    - [ChatController](#chatcontroller)
  - [Config](#config)
  - [API Keys](#api-keys)
- [Client (Mobile)](#client-mobile)
  - [js](#js)
    - [App](#app) 
    - [Auth](auth)
    - [Chat (Client)](#chat-client)
    - [Match](#match)
    - [Socket](#socket)
  - [templates](#templates)
  - [css](#css)

## Server.js
```
server/server.js
```
This file contains all HTTP and Socket.io routing. It is the starting point of all external requests.
### User Object
**user** *object*

- A user object that must contain the following properties:
  - **id** *string*, ObjectId of the MongoDB document underlying the user
  - **name** *string*, name of the user

- Properties required by [Coordinate Matcher](#coordinate-matcher):
  - **address** *string*, address of the user

- Methods decorated by [matchController.add()](#matchcontrolleradd):
  - **join** *function*(*Chatroom Identifier*)

## Database
```
server/db.js
```
Database initialization and configuration is handled by this module. It is required by the Auth and ChatModel modules.
The path to the database can be configured in the [config file](#config).

## Authentication
```
server/auth/
```
### User Model
```
server/auth/userModel.js
```
The database's user model module

**depends on:**
- [Database](#database)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

#### UserSchema.pre()
Encrypts input password using [bcrypt](https://www.npmjs.com/package/bcrypt) before saving to the database.

#### UserSchema.methods.comparePasswords(*candidatePassword*)
Checks to see if the candidate password is the same as the stored password for the user

**candidatePassword** *string*

### Authentication Controller
```
server/auth/auth.js
```
#### Auth.signup(*username*, *password*)
Sign up the user to the app by adding them to the database

**username** *string*

**password** *string*

#### Auth.login(*username*, *password*)
Login the user to the app

**username** *string*

**password** *string*

## Utilities
```
server/lib/utils.js
```
This module contains helper functions for session creation and validation.

## Matching
```
server/match
```
The process by which users are matched to eachother for chatroom creation. The matching system is interfaced by Match Controller and is implemented by Match Model. The Match Model will use a Matcher to match users. This implementation of Kwiki utilizes the Coordinate Matcher, however other Matchers may be used in its place.

### MatchController
```
server/match/matchController.js
```
This module is the interface of the matching system.

#### matchController.add(*user*, *callback*)
Kickstarts the matching mechanism for the user.

1. Appends the callback function to the user object.
1. Adds the user to the lobby.

**user** *object*, a [user object](#user-object)

**callback** *function*(*chatroomId*)

- a callback function that is invoked with a chatroom identifier as the argument:
  - *chatroomId* *string*, identifies the chatroom that the user was matched into

#### matchController.remove(*user*)
*Incomplete feature*

Removes user from matching process before user is matched.

**user** *object*, a [user object](#user-object)

### MatchModel(*matcher*)
```
server/match/matchModel.js
```
Handles the administrative logic of the matching system and combines this with the matching logic of the Matcher. Instantiated in [Match Controller](#match-controller).

**matcher** *object*, instance of a [Matcher](#matcher) such as the [Coordinate Matcher](#coordinate-matcher).

#### matchModel._matcher *object*
Matcher instance this Match Model instance was instantiated with

#### matchModel._size *number*
Size of the match-awaiting users list

#### matchModel.users *array*
Storage of [users](#user-object) who are still match-awaiting

#### matchModel.join(*user*)
Joins user to the matching system

1. Invokes [matchModel._add()](#match-model) with *user*, which adds the user to the Match Model user storage.
1. Invokes [matcher.preMatch()](#matcher) with *user*, a pre-match processing and decorator specific to the matcher.
1. Invokes [matchModel._match()](#match-model), a function that checks for matches in the user storage.

**user** *object*, a [user object](#user-object)

**returns:** *promise*

#### matchModel.leave(*user*)
Removes user from the matching system

**user** *object*, a [user object](#user-object)

**returns:** *promise*

#### matchModel._add(*user*)
Adds user to matchModel.users (match-awaiting users list).

1. Checks if user already exists on the list using matchModel._isDuplicate().
1. Unshifts user onto matchModel.users then increments matchModel._size count.

**returns:** *promise*

#### matchModel._isDuplicate(*user*)
Checks if user already belongs to matchModel.users (match-awaiting users list).

**returns:** *boolean*

#### matchModel._match()
A method that is invoked when a new user is added to the matching system. Creates a new chat under the right conditions.

1. Checks if there are enough users in matchModel.users before proceeding
1. Checks if there is a match using matcher.match()
1. Creates a chat with the users that were returned by matcher.match()

**depends on:** [chatController](#chat-controller)
**returns:** *doesn't return anything*

### Matcher
A matcher module is one that carries out all matching logic for the match model and requires the following properies and methods.

#### matcher.roomSize *number*
The minimum chatroom users needed to make a matching chatroom.

#### matcher.preMatch(*user*)
Pre-match processing and decoration conducted when a user is added to the matching system.

**user** *object*, a [user object](#user-object)

**returns:** *promise*, resolving the user object

#### matcher.match(*users*)
Takes in a [list of users](#matchmodelusers) and returns a match if one is found.

**users** *array*, list of [user object](#user-object)s found in matchModel.users

**returns:** *promise*, resolving an array of matched [user object](#user-object)s, if any.

### Coordinate Matcher(*roomSize*, *maxDist*)
```
server/match/coordMatcher.js
```
A matcher that takes an address string of the user, uses the Google Maps Geocoding API to find the latitude and longitude of the address then uses that information to find a match based on proximity.

#### coordMatcher.maxDist *number*
Maximum distance for a match to be found, in miles

#### coordMatcher._encodeAddress(*address*)
Encodes the address string into a URL friendly version

**address** *string*, the address string

**returns:** *string*, encoded address string

#### coordMatcher._getCoords(*address*)
Gets the coordinates of the address using the Google Maps Geocoding WebAPI

**address** *string*, URL encoded address string

**depends on:**
  - apiKey, the API key for Google Maps WebAPI
  - https, node js module

**returns:** *promise*, resolving returned geocode object

#### coordMatcher._getDistance(*coords*, *coords*)
Finds the distance between two coordinates

**coords** *object*, geocode object returned by coordMatcher._getCoords()

**returns:** *number*, distance between the coordinates given

#### coordMatcher._isMatch(*user*, *user*)
Finds out if the two users are a match given their distance apart

**user** *object*, a [user object](#user-object)

**returns:** *boolean*, whether there is a match or not

## Chat (Server)
```
server/chat
```

### Message Object
**message** *object*

A message object contains the following properties:
- **userName** *string* name of the user posting it
- **text** *string* the string contents of the message

### ChatModel
```
server/chat/chatModel.js
```
This module specifies the MongoDB schemas for the chatting system.
The chat model is comprised of Chatroom and Message, where exists a one-to-many relationship as MongoDB ObjectId references. Each chatroom will have a `messages` array containing `{ObjectId: ObjectId}` references to their respective messages.

### ChatController
```
server/chat/chatController.js
```
The single interface for the chat system

**depends on:**
  - ChatModel.Chatroom
  - ChatModel.Message

#### chatController.createChat(*users*)
Creates a new chat with the given list of users

1. Creates a list of user objects suitable for the ChatModel.Chatroom MongoDB model
1. Invoke ChatModel.Chatroom.create() method to create a chatroom as a MongoDB document
1. Invoke the join() method on each user with the newly created chatroom's ID

**users** *array*, a list of user objects that are to be joined in the chat

#### chatController.addMessage(*chatroomId*, *message*)
Adds a message to the chatroom document on the database

**chatroomId** *string*, ObjectId of the chatroom where the message is to be added

**message** *object*, a [message object](#message-object)

#### chatController.getMessages(*chatroomId*)
*Incomplete feature*

Gets the messages of a particular chatroom

**chatroomId** *string*, ObjectId of the chatroom where the messages are stored

**returns** *promise*

## Config

All config variables can be stored in this module `server/config.js`.

Environmental variables, as well as API keys and database URIs, are referenced in `.env`.


## Client-Mobile
Majority of the important Ionic files are located in a folder called www. Use `ionic serve --lab` in terminal to emulate iOS and Android devices.

## js
```
www/js
```
This directory contains all of the client-side Javascript.
### App
```
www/js/app.js
```
Consists of the main Ionic client.
### Auth
```
www/js/auth.js
```
Consists of authorisation functions.
#### AuthFactory.addUser
Submits a POST request to `signup` and passes an object with `username` and `password`.
#### AuthFactory.checkUser
Submits a POST request to `login` and passes an object with `username` and `password`. Creates a socket connection.
#### AuthFactory.logOut
Submits a POST request to `logout` and passwo
#### AuthFactory.isAuth (deprecated)
Verifies that that userID is stored in local storage.
#### AuthCtrl.addUser
Collects username and password from $scope, then uses `AuthFactory.addUser` to add a new user to the DB if one does not exist.
#### AuthCtrl.checkUser
Collects username and password from $scope, then uses `AuthFactory.checkuser` to verify that user has an account.
#### AuthCtrl.logOut
Calls `AuthFactory.logout()`.

### Chat (Client)
```
www/js/chat.js
```
Consists of chat functions.
#### ChatFactory.loadChat(*callback*)
Triggers a `loadChat` event and create `message` and `leaveChat` event listeners.

#### ChatFactory.leaveChat
Triggers `leaveChat` event.

#### ChatFactory.postMessage(*message*)
Triggers `message` event and sends message to server.

#### ChatCtrl.messages
An array that stores user messages. Clears on `ChatCtrl.loadChat` and `ChatCtrl.logOut`.

#### ChatCtrl.message
An object that is stored in `ChatCtrl.messages`.

#### ChatCtrl.leaveChat(*logout*)
Clears `ChatCtrl.messages` and sends the user back to the matching view. Calls `ChatFactory.leaveChat` and switches the user back to the matching state.

#### ChatCtrl.loadChat
Loads the chat state for users. When one user leaves the chat instance, `ChatFactory.loadChat` is called with `null` and `true` to empty the other user's `ChatCtrl.messages` and switching the user's state to match.

#### ChatCtrl.sendMessage
Sends a message to the server and pushes it to user's `ChatCtrl.messages` for rendering. Sets the client's UI to an empty string.

#### ChatCtrl.logOut
Clears the user's `ChatCtrl.messages` and logs them out. User is able to enter new chats after logging back in.

### Match
```
www/js/match.js
```
Consists of matching functions.
#### MatchFactory.connectSocket
Establishes a socket to connect the user to the `match` namespace on the server.

#### MatchFactory.postMatch
Triggers a `matching` event and creates a `matched` event listener that receives a chatRoomId from the server and switches the user to the `chat` state.

#### MatchCtrl.connect
Establishes the connection for the socket created in `MatchFactory.connectSocket`

#### MatchCtrl.submit
Triggers a `matching` event that prevents the user from entering multiple chats. Switches the user to a `load` state.

#### MatchCtrl.logOut
Logs the user out. User is able to establish a new chat on login.

### Socket
```
www/js/socket.js
```
Consists of socket functions.
#### SocketFactory.host 
Sets the host. Defaults to `localhost:8000` if running locally.

#### SocketFactory.connect
Forces the user to reconnect to the appropriate namespaces.

## templates
```
www/templates
```
- HTML files

## css
```
www/css
```
- CSS Files
