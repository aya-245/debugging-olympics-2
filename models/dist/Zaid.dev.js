"use strict";

var mongoose = require('mongoose'); // Schema


var zaidSchema = new mongoose.Schema({
  name: {
    type: String
  },
  zaidImage: {
    type: String
  },
  isPublic: {
    type: Boolean
  }
}); // model

var Zaid = mongoose.model('Zaid', zaidSchema);
module["export"] = Zaid;