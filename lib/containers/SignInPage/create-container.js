"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSignInContainer;

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

var _reselect = require("reselect");

var _config = _interopRequireDefault(require("../../config"));

var _UserIsNotAuthenticated = _interopRequireDefault(require("../../hocs/AuthWrappers/UserIsNotAuthenticated"));

var _selectors = _interopRequireDefault(require("./selectors"));

var _messages = _interopRequireDefault(require("./messages"));

var _actions = require("./actions");

function createSignInContainer(PageComponent) {
  var _dec, _class;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var AuthWrapper = _config["default"].signInAuthWrapper || _UserIsNotAuthenticated["default"];
  var mapStateToProps = (0, _reselect.createStructuredSelector)({
    SignInPage: _selectors["default"]
  });
  var mapDispatchToProps = {
    onSubmitForm: _actions.signInAction,
    onUnMount: _actions.destroyPageAction
  };
  var SignInContainer = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), AuthWrapper(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inherits2["default"])(SignInContainer, _PureComponent);

    function SignInContainer() {
      (0, _classCallCheck2["default"])(this, SignInContainer);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SignInContainer).apply(this, arguments));
    }

    (0, _createClass2["default"])(SignInContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onUnMount();
      }
    }, {
      key: "render",
      value: function render() {
        var formatMessage = this.props.intl.formatMessage;
        var pageTitle = formatMessage(_messages["default"].pageTitle);
        var pageDescription = formatMessage(_messages["default"].pageDescription);
        return _react["default"].createElement("div", {
          className: options.className || 'sign-in-page'
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
  }(_react.PureComponent)) || _class) || _class) || _class);
  return SignInContainer;
}