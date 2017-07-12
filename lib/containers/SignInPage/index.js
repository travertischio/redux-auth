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

var _SignInForm = require('../../components/SignInForm');

var _SignInForm2 = _interopRequireDefault(_SignInForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 * SignInPage
 *
 */
function SignInPage(props) {
  var onSubmitForm = props.onSubmitForm,
      _props$SignInPage = props.SignInPage,
      loading = _props$SignInPage.loading,
      errorMessage = _props$SignInPage.errorMessage;


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
    _react2.default.createElement(_SignInForm2.default, { onSubmit: onSubmitForm })
  );
}

SignInPage.propTypes = {
  SignInPage: _propTypes2.default.object.isRequired,
  onSubmitForm: _propTypes2.default.func.isRequired
};

exports.default = (0, _createContainer2.default)(SignInPage);