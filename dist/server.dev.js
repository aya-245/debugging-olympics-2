"use strict";

// imports
var express = require("express"); //importing express package


var app = express(); // creates a express application

var dotenv = require("dotenv").config(); //this allows me to use my .env values in this file


var mongoose = require("mongoose");

var Zaid = require('./models/Zaid');

var methodOverride = require('method-override');

var morgan = require('morgan');

function conntectToDB() {
  return regeneratorRuntime.async(function conntectToDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGODB_URI));

        case 3:
          console.log("Connected to Database");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("Error Occured", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

conntectToDB(); // connect to database
// Middleware

app.use(express["static"]('public')); //all static files are in the public folder

app.use(express.urlencoded({
  extended: false
})); // this will allow us to see the data being sent in the POST or PUT

app.use(methodOverride('_method'));
app.use(morgan('dev')); // Routes go here

app.get('/', function (req, res) {
  res.render('homepage.ejs');
});
app.get('/zaids', function _callee(req, res) {
  var allZaids;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Zaid.find());

        case 2:
          allZaids = _context2.sent;
          res.render('all-zaids.ejs', {
            zaids: allZaids
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get('/zaids/new', function (req, res) {
  res.render('create-zaid.ejs');
});
app.post('/zaids', function _callee2(req, res) {
  var createdZaid;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          req.body.isPublic = Boolean(req.body.isPublic);
          _context3.next = 4;
          return regeneratorRuntime.awrap(Zaid.create(req.body));

        case 4:
          createdZaid = _context3.sent;
          res.redirect('/zaids');
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/zaids/:zaidId', function _callee3(req, res) {
  var foundZaid;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Zaid.findById(req.params.zaidId));

        case 2:
          foundZaid = _context4.sent;
          res.render('zaid-details.ejs', {
            zaid: foundZaid
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app["delete"]('/zaids/:id', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Zaid.findByIdAndDelete(req.params.id));

        case 2:
          res.redirect('/zaids');

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log('App is Running');
}); // listen on port 3000