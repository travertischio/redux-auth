"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockedAccount = function BlockedAccount() {
  return _react2.default.createElement(
    "div",
    { id: "blocked-account" },
    _react2.default.createElement(
      "h1",
      null,
      "Your account has been locked because of too many failed login attempts. Please contact your administrator."
    )
  );
}; /**
   *
   * BlockedAccount
   *
   */

exports.default = BlockedAccount;