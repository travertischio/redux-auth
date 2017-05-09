'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxFormInputWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                  * WrappedInput
                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                  */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormError = require('../FormError');

var _FormError2 = _interopRequireDefault(_FormError);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  input: _propTypes2.default.object.isRequired,
  meta: _propTypes2.default.object.isRequired,
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired
};

exports.default = WrappedInput;


function ReduxFormInputWrapper(InputComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(WrappedInputComponent, _Component);

    function WrappedInputComponent() {
      _classCallCheck(this, WrappedInputComponent);

      return _possibleConstructorReturn(this, (WrappedInputComponent.__proto__ || Object.getPrototypeOf(WrappedInputComponent)).apply(this, arguments));
    }

    _createClass(WrappedInputComponent, [{
      key: 'getErrors',
      value: function getErrors() {
        var _props$meta = this.props.meta,
            error = _props$meta.error,
            touched = _props$meta.touched;


        if (error && touched) {
          return (0, _isArray3.default)(error) ? error : [error];
        }

        return null;
      } // eslint-disable-line react/prefer-stateless-function

    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            input = _props.input,
            id = _props.id,
            label = _props.label,
            placeholder = _props.placeholder,
            asyncValidating = _props.meta.asyncValidating;


        return _react2.default.createElement(
          'div',
          { className: asyncValidating ? 'async-validating' : '' },
          _react2.default.createElement(InputComponent, _extends({
            id: id,
            label: label,
            placeholder: placeholder,
            errors: this.getErrors()
          }, input))
        );
      }
    }]);

    return WrappedInputComponent;
  }(_react.Component), _class.propTypes = {
    input: _propTypes2.default.object.isRequired,
    meta: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string.isRequired,
    placeholder: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.string
  }, _temp;
}

exports.ReduxFormInputWrapper = ReduxFormInputWrapper;