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
var elementSchema = mongoose.Schema({

    owner: String,
    specie: String,
    confidence: String,
    longitude: Number,
    latitude:Number,
    constraint:String,
    image:String,
    validation:Array,
});

// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('Element', elementSchema);
