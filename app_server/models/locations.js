const mongoose = require('mongoose');

//initialize the schema
const Schema = mongoose.Schema;

//create a schema for opening hours/times. IT IS IMPORTANT TO NOTE THAT: this schema must be before the locationSchema because it holds data that is found within the locations.
//AS A RESULT, IT IS A SUB-DOCUMENT OF THE locationSchema. It will be nested into the locationSchema for use thereafter.
const openingTimeSchema = new Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});
// define a review schema as a sub-document of the location schema
const reviewSchema = new Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

//  Main location Schema definition
const locationSchema =  new Schema({
    validator: {
       $jsonSchema: {
           _id: {
              type: Schema.Types.ObjectId,
              unique: true
           },
           name: {
              type: String,
              required: true,
              description: 'Location name is required.'
           },
           address: String,
           rating: {
              type: Number,
              'default': 0,
              min: 0,
              max: 5,
           },
           facilities: [String],
           coords: {
              type: { type: String },
              coodinates: [Number]
           },
           //Nested opening times schema for opening and closing of the facilities
           openingTimes: [openingTimeSchema],
           //Nesting the add review schema
           reviews: [reviewSchema]
       }
    }
});

//add a GeoJSON path for the coordinates pair(longitudes and latitudes)
locationSchema.index({coords: '2dsphere'});

//creating a model for the locationSchema
mongoose.model('Location', locationSchema, 'Locations');