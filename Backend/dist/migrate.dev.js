"use strict";

require('dotenv').config();

var _require = require('./lib/mysql'),
    migrate = _require.migrate;

migrate().then(console.log)["catch"](console.error);