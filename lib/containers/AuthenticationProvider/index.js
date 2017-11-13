'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp; /*
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

var _reselect = require('reselect');

var _selectors = require('./selectors');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  isReady: _selectors.selectIsReady,
  isAuthenticated: _selectors.selectIsAuthenticated
});

var mapDispatchToProps = {
  extendTokenLifetime: _actions.extendTokenLifetimeAction
};

var AuthenticationProvider = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = (_temp = _class2 = function (_PureComponent) {
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
      if (this.props.isReady) {
        return this.renderChildren();
      }

      return this.renderLoading();
    }
  }]);

  return AuthenticationProvider;
}(_react.PureComponent), _class2.propTypes = {
  children: _propTypes2.default.element.isRequired,
  isReady: _propTypes2.default.bool.isRequired,
  extendTokenLifetime: _propTypes2.default.func.isRequired
}, _temp)) || _class);
exports.default = AuthenticationProvider;