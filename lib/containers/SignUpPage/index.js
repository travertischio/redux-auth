'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createContainer = require('./create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

var _SignUpForm = require('../../components/SignUpForm');

var _SignUpForm2 = _interopRequireDefault(_SignUpForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 * SignUpPage
 *
 */
function SignUpPage(props) {
  var onSubmitForm = props.onSubmitForm,
      _props$SignUpPage = props.SignUpPage,
      loading = _props$SignUpPage.loading,
      errorMessage = _props$SignUpPage.errorMessage;


  return _react2.default.createElement(
    'div',
    null,
    loading && _react2.default.createElement(
      'div',
      null,
      'Processing... Please wait.'
    ),
    errorMessage && _react2.default.createElement(
      'div',
      null,
      errorMessage
    ),
    _react2.default.createElement(_SignUpForm2.default, { onSubmit: onSubmitForm })
  );
}

SignUpPage.propTypes = {
  SignUpPage: _propTypes2.default.object,
  onSubmitForm: _propTypes2.default.func
};

exports.default = (0, _createContainer2.default)(SignUpPage);