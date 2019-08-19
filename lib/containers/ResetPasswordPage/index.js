"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

var _reactRouterDom = require("react-router-dom");

var _ResetPasswordForm = _interopRequireDefault(require("../../components/ResetPasswordForm"));

var _createContainer = _interopRequireDefault(require("./create-container"));

var _messages = _interopRequireDefault(require("./messages"));

/*
 *
 * ResetPasswordPage
 *
 */
var ResetPasswordPage =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(ResetPasswordPage, _PureComponent);

  function ResetPasswordPage() {
    (0, _classCallCheck2["default"])(this, ResetPasswordPage);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ResetPasswordPage).apply(this, arguments));
  }

  (0, _createClass2["default"])(ResetPasswordPage, [{
    key: "renderSuccessMessage",
    value: function renderSuccessMessage() {
      return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].successHeader)), _react["default"].createElement("div", null, this.renderGoNextBtn()));
    }
  }, {
    key: "renderGoNextBtn",
    value: function renderGoNextBtn() {
      if (this.props.isAuthenticated) {
        return _react["default"].createElement(_reactRouterDom.Link, {
          to: "/home"
        }, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].goToHomeBtnLabel));
      }

      return _react["default"].createElement(_reactRouterDom.Link, {
        to: "/sign-in"
      }, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].goToSignInBtnLabel));
    }
  }, {
    key: "renderFormOrError",
    value: function renderFormOrError() {
      var _this$props = this.props,
          loading = _this$props.ResetPasswordPage.loading,
          errorMessage = _this$props.errorMessage;
      return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].header)), loading && _react["default"].createElement("div", null, "Processing... Please wait."), errorMessage && _react["default"].createElement("p", null, _react["default"].createElement(_reactIntl.FormattedMessage, errorMessage)), this.renderFormOrErrorInner());
    }
  }, {
    key: "renderFormOrErrorInner",
    value: function renderFormOrErrorInner() {
      if (this.props.ResetPasswordPage.invalidToken) {
        return this.renderGoToRequestPasswordPageLink();
      }

      return this.renderForm();
    }
  }, {
    key: "renderGoToRequestPasswordPageLink",
    value: function renderGoToRequestPasswordPageLink() {
      return _react["default"].createElement(_reactRouterDom.Link, {
        to: "/request-password-reset"
      }, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].requestNewPasswordBtnLabel));
    }
  }, {
    key: "renderForm",
    value: function renderForm() {
      var _this$props2 = this.props,
          onSubmitForm = _this$props2.onSubmitForm,
          match = _this$props2.match;
      var initialValues = {
        token: match.params.resetPasswordToken
      };
      return _react["default"].createElement("div", null, _react["default"].createElement(_ResetPasswordForm["default"], {
        onSubmit: onSubmitForm,
        initialValues: initialValues
      }));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.ResetPasswordPage.success) {
        return this.renderSuccessMessage();
      }

      return this.renderFormOrError();
    }
  }]);
  return ResetPasswordPage;
}(_react.PureComponent);

(0, _defineProperty2["default"])(ResetPasswordPage, "defaultProps", {
  errorMessage: null
});

var _default = (0, _createContainer["default"])(ResetPasswordPage);

exports["default"] = _default;