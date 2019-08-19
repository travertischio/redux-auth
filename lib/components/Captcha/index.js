"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRecaptcha = _interopRequireDefault(require("react-recaptcha"));

var _config = _interopRequireDefault(require("../../config"));

/**
*
* Captcha
*
*/
var Captcha = function Captcha(_ref) {
  var onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["onChange"]);
  return _react["default"].createElement(_reactRecaptcha["default"], (0, _extends2["default"])({}, rest, {
    render: "explicit",
    sitekey: _config["default"].recaptchaSiteKey,
    verifyCallback: onChange
  }));
};

var _default = Captcha;
exports["default"] = _default;