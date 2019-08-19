"use strict";

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

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _actions = require("../AuthenticationProvider/actions");

var _dec, _class;

var mapDispatchToProps = {
  signOut: _actions.signOutAction
};
var SignOutPage = (_dec = (0, _reactRedux.connect)(null, mapDispatchToProps), _dec(_class =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(SignOutPage, _Component);

  function SignOutPage() {
    (0, _classCallCheck2["default"])(this, SignOutPage);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SignOutPage).apply(this, arguments));
  }

  (0, _createClass2["default"])(SignOutPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.signOut();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return SignOutPage;
}(_react.Component)) || _class);
exports["default"] = SignOutPage;