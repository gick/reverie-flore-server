// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
/*
var mapinfoSchema = mongoose.Schema({
    marker:String,
    centerLatitude:Number,
    centerLongitude:Number,
    zoomLevel:Number,
})*/

// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('FloreData',
    new mongoose.Schema({
    "Specie": String,
    "Family": String,
    "Longitude": Number,
    "Latitude": Number,
    "Date": Date,
    }),
    'floredata'); // collection
