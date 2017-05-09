'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
*
* FormError
*
*/

function FormError(_ref) {
  var error = _ref.error,
      touched = _ref.touched;

  if (error && touched) {
    return _react2.default.createElement(
      'div',
      { className: 'error' },
      error
    );
  }
  return null;
}

FormError.propTypes = {
  error: _propTypes2.default.string,
  touched: _propTypes2.default.bool
};

exports.default = FormError;