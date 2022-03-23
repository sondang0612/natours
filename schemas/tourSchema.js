const mongoose = require('mongoose');
const { Schema } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },

  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

module.exports = mongoose.model('Tour', tourSchema);
