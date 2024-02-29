const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String, //react /js
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  code: {
    type: String,
    required: true
  }
});

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;