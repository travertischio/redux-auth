'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                  * WrappedInput
                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                  */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormError = require('../FormError');

var _FormError2 = _interopRequireDefault(_FormError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WrappedInput(_ref) {
  var input = _ref.input,
      id = _ref.id,
      label = _ref.label,
      placeholder = _ref.placeholder,
      type = _ref.type,
      _ref$meta = _ref.meta,
      asyncValidating = _ref$meta.asyncValidating,
      touched = _ref$meta.touched,
      error = _ref$meta.error;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'label',
      { htmlFor: id },
      label
    ),
    _react2.default.createElement(
      'div',
      { className: asyncValidating ? 'async-validating' : '' },
      _react2.default.createElement('input', _extends({}, input, {
        type: type,
        id: id,
        placeholder: placeholder
      }))
    ),
    _react2.default.createElement(_FormError2.default, { error: error, touched: touched })
  );
}

WrappedInput.propTypes = {
  input: _react.PropTypes.object.isRequired,
  meta: _react.PropTypes.object.isRequired,
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string.isRequired,
  placeholder: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.string.isRequired
};

exports.default = WrappedInput;