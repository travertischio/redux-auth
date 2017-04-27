'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselect = require('reselect');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withContext = require('recompose/withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _selectors = require('./selectors');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * AuthenticationProvider
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AuthenticationProvider = function (_React$PureComponent) {
  _inherits(AuthenticationProvider, _React$PureComponent);

  function AuthenticationProvider() {
    _classCallCheck(this, AuthenticationProvider);

    return _possibleConstructorReturn(this, (AuthenticationProvider.__proto__ || Object.getPrototypeOf(AuthenticationProvider)).apply(this, arguments));
  }

  _createClass(AuthenticationProvider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.refreshToken();
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return _react2.default.createElement(
        'div',
        null,
        'Loading...'
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.Children.only(this.props.children)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.hasTokenRefreshed) {
        return this.renderChildren();
      }

      return this.renderLoading();
    }
  }]);

  return AuthenticationProvider;
}(_react2.default.PureComponent);

AuthenticationProvider.propTypes = {
  refreshToken: _react.PropTypes.func.isRequired,
  children: _react.PropTypes.element.isRequired,
  hasTokenRefreshed: _react.PropTypes.bool.isRequired
};

var AuthenticationProviderContext = (0, _withContext2.default)({
  isAuthenticated: _react.PropTypes.bool
}, function (props) {
  return {
    isAuthenticated: props.isAuthenticated
  };
});

var composedComponent = (0, _compose2.default)(AuthenticationProviderContext)(AuthenticationProvider);

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  hasTokenRefreshed: (0, _selectors.makeSelectHasTokenRefreshed)(),
  isAuthenticated: (0, _selectors.makeSelectIsAuthenticated)()
});

var mappedDispatch = {
  refreshToken: _actions.refreshTokenAction
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mappedDispatch)(composedComponent);