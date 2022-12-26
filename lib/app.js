const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const locale = require('express-locale');

function App() {
  this.app = express();

  this.init();
}

App.prototype.init = function () {
  this.app.use(morgan('tiny'));
  this.app.use(cors());
  this.app.use(helmet());
  this.app.use(express.urlencoded({ extended: true }));
  this.app.use(express.json());
  this.app.use(locale());
};

module.exports = App;
