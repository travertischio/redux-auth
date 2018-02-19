'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _class3, _temp; /*
                                                           *
                                                           * AuthenticationProvider
                                                           *
                                                           */
// TODO: check if we need pure


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _decko = require('decko');

var _reselect = require('reselect');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _selectors = require('./selectors');

var _actions = require('./actions');

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  isReady: _selectors.selectIsReady,
  isAuthenticated: _selectors.selectIsAuthenticated
});

var mapDispatchToProps = {
  extendTokenLifetime: _actions.extendTokenLifetimeAction,
  signOut: _actions.signOutAction
};

var AuthenticationProvider = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_class2 = (_temp = _class3 = function (_PureComponent) {
  _inherits(AuthenticationProvider, _PureComponent);

  function AuthenticationProvider() {
    _classCallCheck(this, AuthenticationProvider);

    return _possibleConstructorReturn(this, (AuthenticationProvider.__proto__ || Object.getPrototypeOf(AuthenticationProvider)).apply(this, arguments));
  }

  _createClass(AuthenticationProvider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.extendTokenLifetime();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (_config2.default.autoSignOutWithin) {
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancelAutoSignOutTimer();
    }
  }, {
    key: 'getLastActive',
    value: function getLastActive() {
      return (0, _utils.getItemFromStorage)(_constants.LAST_ACTIVE_KEY);
    }
  }, {
    key: 'setLastActive',
    value: function setLastActive() {
      return (0, _utils.setItemInStorage)(_constants.LAST_ACTIVE_KEY, (0, _moment2.default)().valueOf());
    }

    /**
    * Function calculates time to auto sign out (in ms) based on last active time.
    * Thanks to this each tab will be signed out at the same time.
    */

  }, {
    key: 'getTimeToAutoSignOut',
    value: function getTimeToAutoSignOut() {
      var lastActive = this.getLastActive();

      if (lastActive) {
        var expireWithinMs = _config2.default.autoSignOutWithin - ((0, _moment2.default)().valueOf() - lastActive);

        return Math.max(0, expireWithinMs);
      }

      return _config2.default.autoSignOutWithin;
    }

    /**
    * Function detects if a user is active by last active date saved in localStorage.
    * Why in localStorage? Because the user might use multiple tabs in the browser
    * and we have to exchange last active date between tabs.
    */

  }, {
    key: 'userIsNotActive',
    value: function userIsNotActive() {
      var lastActive = this.getLastActive();

      return !lastActive || lastActive <= (0, _moment2.default)().subtract(_config2.default.autoSignOutWithin).valueOf();
    }
  }, {
    key: 'runAutoSignOutTimer',
    value: function runAutoSignOutTimer() {
      var _this2 = this;

      this.autoSignOutTimer = setTimeout(function () {
        if (_this2.userIsNotActive()) {
          _this2.cancelAutoSignOutTimer();
          _this2.props.signOut();
        } else {
          _this2.runAutoSignOutTimer();
        }
      }, this.getTimeToAutoSignOut());
    }
  }, {
    key: 'resetAutoSignOutTimer',
    value: function resetAutoSignOutTimer() {
      if (this.autoSignOutTimer) {
        this.cancelAutoSignOutTimer();
        this.setLastActive();
        this.runAutoSignOutTimer();
      }
    }
  }, {
    key: 'cancelAutoSignOutTimer',
    value: function cancelAutoSignOutTimer() {
      clearTimeout(this.autoSignOutTimer);
      this.autoSignOutTimer = null;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.resetAutoSignOutTimer();
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return _react2.default.createElement(
        'div',
        { className: 'loading-auth' },
        'Loading...'
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      return (
        // eslint-disable-next-line
        _react2.default.createElement(
          'div',
          { onClick: this.handleClick },
          _react2.default.Children.only(this.props.children)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isReady) {
        return this.renderChildren();
      }

      return this.renderLoading();
    }
  }]);

  return AuthenticationProvider;
}(_react.PureComponent), _class3.propTypes = {
  children: _propTypes2.default.element.isRequired,
  extendTokenLifetime: _propTypes2.default.func.isRequired,
  isAuthenticated: _propTypes2.default.bool.isRequired,
  isReady: _propTypes2.default.bool.isRequired,
  signOut: _propTypes2.default.func.isRequired
}, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_decko.bind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype)), _class2)) || _class);
exports.default = AuthenticationProvider;