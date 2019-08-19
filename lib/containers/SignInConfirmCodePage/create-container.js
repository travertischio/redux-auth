"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSignInConfirmCodeContainer;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _reactIntl = require("react-intl");

var _config = _interopRequireDefault(require("../../config"));

var _UserIsNotAuthenticated = _interopRequireDefault(require("../../hocs/AuthWrappers/UserIsNotAuthenticated"));

var _TokeDataExists = _interopRequireDefault(require("../../hocs/AuthWrappers/TokeDataExists"));

var _messages = _interopRequireDefault(require("./messages"));

var _actions = require("./actions");

function createSignInConfirmCodeContainer(PageComponent) {
  var _dec, _class;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var AuthWrapper = _config["default"].signInAuthWrapper || _UserIsNotAuthenticated["default"];

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onSubmitForm: function onSubmitForm(values) {
        return new Promise(function (resolve, reject) {
          dispatch((0, _actions.confirmCodeAction)(values, resolve, reject));
        });
      }
    };
  };

  var SignInContainer = (_dec = (0, _reactRedux.connect)(null, mapDispatchToProps), (0, _TokeDataExists["default"])(_class = AuthWrapper(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inherits2["default"])(SignInContainer, _PureComponent);

    function SignInContainer() {
      (0, _classCallCheck2["default"])(this, SignInContainer);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SignInContainer).apply(this, arguments));
    }

    (0, _createClass2["default"])(SignInContainer, [{
      key: "render",
      value: function render() {
        var formatMessage = this.props.intl.formatMessage;
        var pageTitle = formatMessage(_messages["default"].pageTitle);
        var pageDescription = formatMessage(_messages["default"].pageDescription);
        return _react["default"].createElement("div", {
          className: options.className || 'sign-in-confirm-code-page'
        }, !options.noHelmet && _react["default"].createElement(_reactHelmet["default"], {
          title: pageTitle,
          meta: [{
            name: 'description',
            content: pageDescription
          }]
        }), _react["default"].createElement(PageComponent, this.props));
      }
    }]);
    return SignInContainer;
  }(_react.PureComponent)) || _class) || _class) || _class) || _class);
  return SignInContainer;
}