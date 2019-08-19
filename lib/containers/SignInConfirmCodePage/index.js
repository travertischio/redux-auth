"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("redux-form/immutable");

var _SignInConfirmCodeForm = _interopRequireDefault(require("../../components/SignInConfirmCodeForm"));

var _createContainer = _interopRequireDefault(require("./create-container"));

/*
 *
 * SignInConfirmCodePage
 *
 */
function SignInConfirmCodePage(props) {
  var handleSubmit = function handleSubmit(values) {
    return props.onSubmitForm(values)["catch"](function (error) {
      throw new _immutable.SubmissionError(error.response && error.response.data);
    });
  };

  return _react["default"].createElement(_SignInConfirmCodeForm["default"], {
    onSubmit: handleSubmit
  });
}

var _default = (0, _createContainer["default"])(SignInConfirmCodePage);

exports["default"] = _default;