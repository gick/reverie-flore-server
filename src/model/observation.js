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


module.exports = mongoose.model('Observation', new mongoose.Schema({
    Specie: String,
    AltName: String,
    Family: String,
    lat: Number,
    lng: Number,
    location: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    date: Date,
}))