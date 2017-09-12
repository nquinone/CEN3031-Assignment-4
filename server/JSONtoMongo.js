'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./models/listings.server.model'), 
    config = require('./config/config');
    
/* Connect to your database */
mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */


//            WAY 1:
var totalListings = require('./listings.json');
// var listingModel = mongoose.model('listingModel', fs.ListingSchema);
  for(var i=0; i<totalListings.entries.length;i++){
    
    var addListing = new Listing({
      name: totalListings.entries[i].name,
      code: totalListings.entries[i].code,
      address: totalListings.entries[i].address,
      coordinates: totalListings.entries[i].coordinates
    });
    console.log(addListing);
    addListing.save(function(err){
      if(err) {
        console.log('An Error has Ocurred!');
        throw err;
      }
      console.log('Listing has been added!');
      
    });
  }

  Listing.find({}, function(err, listings){
    console.log('got in');
    if(err) throw err;
    console.log(listings);
  });






/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */