'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withUserData;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withUserData(WrappedComponent) {
  var ComponentWithUserData = function ComponentWithUserData(props) {
    return _react2.default.createElement(WrappedComponent, props);
  };

  var mapStateToProps = (0, _reselect.createStructuredSelector)({
    isAuthenticated: _.selectIsAuthenticated,
    userData: _.selectUser
  });

  return (0, _reactRedux.connect)(mapStateToProps)(ComponentWithUserData);
}