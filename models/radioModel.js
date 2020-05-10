var mongoose = require('mongoose');
var Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

var RadioSchema =  new Schema({
    site_id: Number,
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        unique: true,
        required: true,
    },
    description: String,
});

module.exports = mongoose.model('RadioModel', RadioSchema);
