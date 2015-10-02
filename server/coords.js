//Get google geocoding API from apiConfig
var key = require("./apiConfig.js").geocoding;
var https = require("https");

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

//take an address string and make a call to he google api, then run the callback on a lat/lng object
exports.getCoords = function (addressString, callback) {
  
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encode(addressString) +  "&key=" + key;
  
  console.log("Sending GET to:", url); //remove after testing

  https.get(url, function (res) {

    //maps send response in JSON with an array of results,
    //each result the following properties (among many others):
    // geometry:
      // location:
        // lat
        // lng

    var buffer = "";
    res.on('data', function (data) {
      buffer += data;
    });
    res.on('end', function () {
      var results = JSON.parse(buffer).results;
      //its possible (thought hasn't happend in testing yet) that maps will give back multiple results
      if (results === 0) {
        console.log("COULD NOT LOOKUP ADDRESS");
        callback();
      } else if (results > 1) {
        console.log("ADDRESS IS TOO VAGUE");
        callback();
      } else {
        callback(JSON.parse(buffer).results[0].geometry.location);
      }

    });

  }).on('error', function (e) {
    console.error("Error with geocoding API:", e);
  });

};

//take two lat/lng objects and return the distance between them (in miles)
exports.getDistance = function (coords1, coords2) {

  var R = 3958.7558657440545; // Radius of earth in Miles 

  var dLat = toRad(coords2.lat - coords1.lat);
  var dLon = toRad(coords2.lng - coords1.lng); 
  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  
  return d;

  function toRad(Value) {
      /** Converts numeric degrees to radians */
      return Value * Math.PI / 180;
  }

};