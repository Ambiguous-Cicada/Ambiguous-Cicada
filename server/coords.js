//Get google geocoding API from apiConfig
var key = require("./apiConfig.js").geocoding;

//helper function to escape special characters in an address string to their URL encodings
var encode = function (addressString) {

  //all special characters and their respective url encodings
  var specials = {
    " ": "%20", "#": "%23", "$": "%24", "%": "%25", "&": "%26", "@": "%40", "`": "%60", "/": "%2F", ":": "%3A",
    ";": "%3B", "<": "%3C", "=": "%3D", ">": "%3E", "?": "%3F", "[": "%5B", "\\": "%5C", "]": "%5D", "^": "%5E",
    "{": "%7B", "|": "%7C", "}": "%7D", "~": "%7E", "\“": "%22", "‘": "%27", "+": "%2B", ",": "%2C", 
  };

  //replace all special characters in addressString with their url encodings and return the encoded string
  return addressString.split("").map(function (char) {
    return specials[char] || char;
  }).join("");
};

//take an address string and make a call tot he google api. return lat and long as an object;
exports.getCoords = function (addressString) {

};

//take two lat/long objects and return the distance between them (in miles)
exports.getDistance = function (coords1, coords2) {

};