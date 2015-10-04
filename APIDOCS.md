# Kwiki API Documentation

## Table of Contents

1. [Server](#server)
  1. [Server.js](#serverjs)
  1. [Database](#database)
  1. [Authentication](#authentication)
  1. [Utilities](#utils)
  1. [Matching](#matching)
    1. [Match Controller](#matchcontroller)
    1. [Match Model](#matchmodel)
    1. [Matcher](#matcher)
    1. [Coordinate Matcher](#coordinate-matcher)
  1. [Chat](#chat)
  1. [Config](#config)
  1. [API Keys](#api-keys)
1. [Client](#client)

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
--- REFACTOR INTO TWO FILES

## Utilities
```
server/lib/utils.js
```
--- REALLY ONLY HANDLES SESSION STUFF - REFACTOR

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

**callback** *function*(*chatRoomId*)

- a callback function that is invoked with a chatroom identifier as the argument:
  - *chatRoomId* *string*, identifies the chatroom that the user was matched into

#### matchController.remove(*user*)
Removes user from matching process before user is matched.

- Yet to be completely implemented.

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

### Chat
### Config
### API Keys

## Client
