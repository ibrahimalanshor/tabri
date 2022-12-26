const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const locale = require('express-locale');

function App(config = {}) {
  this.app = express();
  this.httpServer = null;

  this.app.set('port', config.port || 4000);

  if (config.logging ?? true) {
    this.app.use(morgan('tiny'));
  }

  this.app.use(cors());
  this.app.use(helmet());
  this.app.use(express.urlencoded({ extended: true }));
  this.app.use(express.json());
  this.app.use(locale());

  if (config.static) {
    this.app.use(config.static.path, express.static(config.static.dir));
  }
}

App.prototype.run = function (cb) {
  const port = this.app.get('port');

  this.httpServer = this.app.listen(this.app.get('port'), () => {
    cb ? cb(port) : console.log(`server running at ${port}`);
  });
};

App.prototype.stop = function () {
  this.httpServer.close();
};

module.exports = App;
