'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SignInForm = require('../../components/SignInForm');

var _SignInForm2 = _interopRequireDefault(_SignInForm);

var _BlockedAccount = require('../../components/BlockedAccount');

var _BlockedAccount2 = _interopRequireDefault(_BlockedAccount);

var _createContainer = require('./create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SignInPage(props) {
  var onSubmitForm = props.onSubmitForm,
      _props$SignInPage = props.SignInPage,
      blockedAccount = _props$SignInPage.blockedAccount,
      captchaRequired = _props$SignInPage.captchaRequired,
      errorMessage = _props$SignInPage.errorMessage,
      loading = _props$SignInPage.loading;


  return _react2.default.createElement(
    'div',
    null,
    blockedAccount && _react2.default.createElement(_BlockedAccount2.default, null),
    !blockedAccount && _react2.default.createElement(
      _react.Fragment,
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
      _react2.default.createElement(_SignInForm2.default, {
        captchaRequired: captchaRequired,
        onSubmit: onSubmitForm
      })
    )
  );
} /*
   *
   * SignInPage
   *
   */


SignInPage.propTypes = {
  onSubmitForm: _propTypes2.default.func.isRequired,
  SignInPage: _propTypes2.default.object.isRequired
};

exports.default = (0, _createContainer2.default)(SignInPage);