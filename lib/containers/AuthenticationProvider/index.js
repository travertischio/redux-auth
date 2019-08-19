"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _decko = require("decko");

var _reselect = require("reselect");

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../../config"));

var _selectors = require("./selectors");

var _actions = require("./actions");

var _utils = require("./utils");

var _constants = require("./constants");

var _dec, _class, _class2;

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  isReady: _selectors.selectIsReady,
  isAuthenticated: _selectors.selectIsAuthenticated
});
var mapDispatchToProps = {
  extendTokenLifetime: _actions.extendTokenLifetimeAction,
  signOut: _actions.signOutAction
};
var AuthenticationProvider = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_class2 =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(AuthenticationProvider, _PureComponent);

  function AuthenticationProvider() {
    (0, _classCallCheck2["default"])(this, AuthenticationProvider);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AuthenticationProvider).apply(this, arguments));
  }

  (0, _createClass2["default"])(AuthenticationProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.extendTokenLifetime();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (_config["default"].autoSignOutWithin) {
        if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
          this.setLastActive();
          this.runAutoSignOutTimer();
        }

        if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
          this.cancelAutoSignOutTimer();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelAutoSignOutTimer();
    }
  }, {
    key: "getLastActive",
    value: function getLastActive() {
      return (0, _utils.getItemFromStorage)(_constants.LAST_ACTIVE_KEY);
    }
  }, {
    key: "setLastActive",
    value: function setLastActive() {
      return (0, _utils.setItemInStorage)(_constants.LAST_ACTIVE_KEY, (0, _moment["default"])().valueOf());
    }
    /**
    * Function calculates time to auto sign out (in ms) based on last active time.
    * Thanks to this each tab will be signed out at the same time.
    */

  }, {
    key: "getTimeToAutoSignOut",
    value: function getTimeToAutoSignOut() {
      var lastActive = this.getLastActive();

      if (lastActive) {
        var expireWithinMs = _config["default"].autoSignOutWithin - ((0, _moment["default"])().valueOf() - lastActive);
        return Math.max(0, expireWithinMs);
      }

      return _config["default"].autoSignOutWithin;
    }
    /**
    * Function detects if a user is active by last active date saved in localStorage.
    * Why in localStorage? Because the user might use multiple tabs in the browser
    * and we have to exchange last active date between tabs.
    */

  }, {
    key: "userIsNotActive",
    value: function userIsNotActive() {
      var lastActive = this.getLastActive();
      return !lastActive || lastActive <= (0, _moment["default"])().subtract(_config["default"].autoSignOutWithin).valueOf();
    }
  }, {
    key: "runAutoSignOutTimer",
    value: function runAutoSignOutTimer() {
      var _this = this;

      this.autoSignOutTimer = setTimeout(function () {
        if (_this.userIsNotActive()) {
          _this.cancelAutoSignOutTimer();

          _this.props.signOut();
        } else {
          _this.runAutoSignOutTimer();
        }
      }, this.getTimeToAutoSignOut());
    }
  }, {
    key: "resetAutoSignOutTimer",
    value: function resetAutoSignOutTimer() {
      if (this.autoSignOutTimer) {
        this.cancelAutoSignOutTimer();
        this.setLastActive();
        this.runAutoSignOutTimer();
      }
    }
  }, {
    key: "cancelAutoSignOutTimer",
    value: function cancelAutoSignOutTimer() {
      clearTimeout(this.autoSignOutTimer);
      this.autoSignOutTimer = null;
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.resetAutoSignOutTimer();
    }
  }, {
    key: "renderLoading",
    value: function renderLoading() {
      return _react["default"].createElement("div", {
        className: "loading-auth"
      }, "Loading...");
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      return (// eslint-disable-next-line
        _react["default"].createElement("div", {
          onClick: this.handleClick
        }, _react["default"].Children.only(this.props.children))
      );
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.isReady) {
        return this.renderChildren();
      }

      return this.renderLoading();
    }
  }]);
  return AuthenticationProvider;
}(_react.PureComponent), ((0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "handleClick", [_decko.bind], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClick"), _class2.prototype)), _class2)) || _class);
exports["default"] = AuthenticationProvider;