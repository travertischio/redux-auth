"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SignInForm = _interopRequireDefault(require("../../components/SignInForm"));

var _BlockedAccount = _interopRequireDefault(require("../../components/BlockedAccount"));

var _createContainer = _interopRequireDefault(require("./create-container"));

/*
 *
 * SignInPage
 *
 */
function SignInPage(props) {
  var onSubmitForm = props.onSubmitForm,
      _props$SignInPage = props.SignInPage,
      blockedAccount = _props$SignInPage.blockedAccount,
      captchaRequired = _props$SignInPage.captchaRequired,
      errorMessage = _props$SignInPage.errorMessage,
      loading = _props$SignInPage.loading;
  return _react["default"].createElement("div", null, blockedAccount && _react["default"].createElement(_BlockedAccount["default"], null), !blockedAccount && _react["default"].createElement(_react["default"].Fragment, null, loading && _react["default"].createElement("div", null, "Processing... Please wait."), errorMessage && _react["default"].createElement("div", null, errorMessage), _react["default"].createElement(_SignInForm["default"], {
    captchaRequired: captchaRequired,
    onSubmit: onSubmitForm
  })));
}

var _default = (0, _createContainer["default"])(SignInPage);

exports["default"] = _default;