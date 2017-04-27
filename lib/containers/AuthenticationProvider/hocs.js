'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationContext = undefined;

var _react = require('react');

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthenticationContext = exports.AuthenticationContext = (0, _getContext2.default)({
  isAuthenticated: _react.PropTypes.bool
});