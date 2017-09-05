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
var tela = mongoose.Schema({

    "Espèce": String,
    "FullEspece":String,
    "City":String,
    "Family": String,
    "lat": Number,
    "lng": Number,
    "date": Date,
});

module.exports = mongoose.model('Tela', tela);
// generating a hash

// create the model for users and expose it to our app
