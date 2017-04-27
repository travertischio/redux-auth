"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormError(_ref) {
  var error = _ref.error,
      touched = _ref.touched;

  if (error && touched) {
    return _react2.default.createElement(
      "div",
      { className: "error" },
      error
    );
  }
  return null;
} /**
  *
  * FormError
  *
  */

FormError.propTypes = {
  error: _react.PropTypes.string,
  touched: _react.PropTypes.bool
};

exports.default = FormError;