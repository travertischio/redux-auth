'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectedReduxRedirectV4 = exports.connectedReduxRedirectV3 = undefined;

var _redirect = require('redux-auth-wrapper/history3/redirect');

var _redirect2 = require('redux-auth-wrapper/history4/redirect');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectedReduxRedirect = _config2.default.reactRouterVersion === 3 ? _redirect.connectedReduxRedirect : _redirect2.connectedReduxRedirect;

exports.default = connectedReduxRedirect;
exports.connectedReduxRedirectV3 = _redirect.connectedReduxRedirect;
exports.connectedReduxRedirectV4 = _redirect2.connectedReduxRedirect;