"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SignUpForm = _interopRequireDefault(require("../../components/SignUpForm"));

var _createContainer = _interopRequireDefault(require("./create-container"));

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
  return _react["default"].createElement("div", null, loading && _react["default"].createElement("div", null, "Processing... Please wait."), errorMessage && _react["default"].createElement("div", null, errorMessage), _react["default"].createElement(_SignUpForm["default"], {
    onSubmit: onSubmitForm
  }));
}

var _default = (0, _createContainer["default"])(SignUpPage);

exports["default"] = _default;