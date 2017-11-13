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

var _SignInConfirmCodeForm = require('../../components/SignInConfirmCodeForm');

var _SignInConfirmCodeForm2 = _interopRequireDefault(_SignInConfirmCodeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 * SignInConfirmCodePage
 *
 */
function SignInConfirmCodePage(props) {
  var onSubmitForm = props.onSubmitForm,
      _props$SignInConfirmC = props.SignInConfirmCodePage,
      loading = _props$SignInConfirmC.loading,
      errorMessage = _props$SignInConfirmC.errorMessage;


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
    _react2.default.createElement(_SignInConfirmCodeForm2.default, { onSubmit: onSubmitForm })
  );
}

SignInConfirmCodePage.propTypes = {
  SignInConfirmCodePage: _propTypes2.default.object.isRequired,
  onSubmitForm: _propTypes2.default.func.isRequired
};

exports.default = (0, _createContainer2.default)(SignInConfirmCodePage);