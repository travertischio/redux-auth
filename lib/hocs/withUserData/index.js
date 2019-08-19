"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = withUserData;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _selectors = require("../../containers/AuthenticationProvider/selectors");

function withUserData(WrappedComponent) {
  var ComponentWithUserData = function ComponentWithUserData(props) {
    return _react["default"].createElement(WrappedComponent, props);
  };

  var mapStateToProps = (0, _reselect.createStructuredSelector)({
    isAuthenticated: _selectors.selectIsAuthenticated,
    userData: _selectors.selectUser
  });
  return (0, _reactRedux.connect)(mapStateToProps)(ComponentWithUserData);
}