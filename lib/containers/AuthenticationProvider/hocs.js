'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationContext = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthenticationContext = exports.AuthenticationContext = (0, _getContext2.default)({
  isAuthenticated: _propTypes2.default.bool
});