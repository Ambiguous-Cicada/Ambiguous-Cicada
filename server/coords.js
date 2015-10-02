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

//fairly accurate lat/lng to distance converter
//see http://andrew.hedges.name/experiments/haversine for limitations

  // var R = 3961; //radius of earth in miles
  // var dlng = coords1.lng - coords2.lng;
  // var dlat = coords1.lat - coords2.lat; 

  // var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(coords1.lat) * Math.cos(coords2.lat) * Math.pow(Math.sin(dlng/2), 2);
  // var d = R * ( 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) );
  // return d; //distance between coords in miles

};