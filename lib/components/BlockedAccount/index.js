"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

/**
*
* BlockedAccount
*
*/
var BlockedAccount = function BlockedAccount() {
  return _react["default"].createElement("div", {
    id: "blocked-account"
  }, _react["default"].createElement("h1", null, "Your account has been locked because of too many failed login attempts. Please contact your administrator."));
};

var _default = BlockedAccount;
exports["default"] = _default;