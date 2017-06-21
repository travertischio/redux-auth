'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserIsNotAuthenticatedWithCustomRedirect = require('./UserIsNotAuthenticatedWithCustomRedirect');

var _UserIsNotAuthenticatedWithCustomRedirect2 = _interopRequireDefault(_UserIsNotAuthenticatedWithCustomRedirect);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _UserIsNotAuthenticatedWithCustomRedirect2.default)(_config2.default.userIsAuthenticatedRedirectPath);