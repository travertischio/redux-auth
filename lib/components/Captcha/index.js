'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRecaptcha = require('react-recaptcha');

var _reactRecaptcha2 = _interopRequireDefault(_reactRecaptcha);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             * Captcha
                                                                                                                                                                                                                             *
                                                                                                                                                                                                                             */

var Captcha = function Captcha(_ref) {
  var onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['onChange']);

  return _react2.default.createElement(_reactRecaptcha2.default, _extends({}, rest, {
    render: 'explicit',
    sitekey: _config2.default.recaptchaSiteKey,
    verifyCallback: onChange
  }));
};

Captcha.propTypes = {
  onChange: _propTypes2.default.func.isRequired
};

exports.default = Captcha;