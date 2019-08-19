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

var _RequestPasswordResetForm = _interopRequireDefault(require("../../components/RequestPasswordResetForm"));

var _createContainer = _interopRequireDefault(require("./create-container"));

var _messages = _interopRequireDefault(require("./messages"));

/*
 *
 * RequestPasswordResetPage
 *
*/
var RequestPasswordResetPage =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(RequestPasswordResetPage, _PureComponent);

  function RequestPasswordResetPage() {
    (0, _classCallCheck2["default"])(this, RequestPasswordResetPage);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RequestPasswordResetPage).apply(this, arguments));
  }

  (0, _createClass2["default"])(RequestPasswordResetPage, [{
    key: "renderSuccessMessage",
    value: function renderSuccessMessage() {
      return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].successHeader)), _react["default"].createElement("p", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].successMessage)), _react["default"].createElement("p", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].successMessageSpamTip)));
    }
  }, {
    key: "renderRequestPasswordResetForm",
    value: function renderRequestPasswordResetForm() {
      var _this$props = this.props,
          onSubmitForm = _this$props.onSubmitForm,
          loading = _this$props.RequestPasswordResetPage.loading,
          errorMessage = _this$props.errorMessage;
      return _react["default"].createElement("div", null, _react["default"].createElement("h1", null, _react["default"].createElement(_reactIntl.FormattedMessage, _messages["default"].header)), loading && _react["default"].createElement("div", null, "Processing... Please wait."), errorMessage && _react["default"].createElement("p", null, _react["default"].createElement(_reactIntl.FormattedMessage, errorMessage)), _react["default"].createElement(_RequestPasswordResetForm["default"], {
        onSubmit: onSubmitForm
      }));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.RequestPasswordResetPage.sent) {
        return this.renderSuccessMessage();
      }

      return this.renderRequestPasswordResetForm();
    }
  }]);
  return RequestPasswordResetPage;
}(_react.PureComponent);

(0, _defineProperty2["default"])(RequestPasswordResetPage, "defaultProps", {
  errorMessage: null
});

var _default = (0, _createContainer["default"])(RequestPasswordResetPage);

exports["default"] = _default;