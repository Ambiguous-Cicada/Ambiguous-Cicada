//Get google geocoding API from apiConfig
var key = require("./apiConfig.js").geocoding;
var http = require("https");

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

//take an address string and make a call to he google api, then run the callback on a lat/long object
exports.getCoords = function (addressString, callback) {
  
  var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + encode(addressString) +  "&key=" + key;
  
  console.log("Sending GEt to:", url); //remove after testing

  https.get(url, function (res) {

    //maps send response in JSON including the following properties (among many others):
    // geometry:
      // location:
        // lat
        // lng

    res.on('data', function (data) {
      
      console.log("Return from maps API:", data); //remove after testing
      
      callback(JSON.parse(data).geometry.location);

    });

  }).on('error', function (e) {
    console.error("Error with map API:", e);
  });

};

//take two lat/long objects and return the distance between them (in miles)
exports.getDistance = function (coords1, coords2) {

};