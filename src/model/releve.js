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
var releveSchema = mongoose.Schema({

    "Espèce": String,
    "Latitude": Number,
    "Longitude": Number,
    "Date": String,
});

// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('Releve',
    new mongoose.Schema({
        "Espèce": String,
        "Latitude": Number,
        "Longitude": Number,
        "Date": String,
    }),
    'releve'); // collection
