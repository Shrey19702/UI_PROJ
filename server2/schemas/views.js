const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewsSchema = new Schema({
    element: {
      type: Schema.Types.ObjectId,
      ref: 'Element'
    },
    views: {
      type: Number,
      default: 1
    }
  });

  const Views = mongoose.model('Views', ViewsSchema);

  module.exports = Views;
  