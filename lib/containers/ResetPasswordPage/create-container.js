'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createResetPasswordContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _hocs = require('../AuthenticationProvider/hocs');

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createResetPasswordContainer(PageComponent) {
  var _dec, _dec2, _class, _class2, _temp;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mapStateToProps = (0, _reselect.createStructuredSelector)({
    ResetPasswordPage: _selectors2.default
  });

  var mapDispatchToProps = {
    onSubmitForm: _actions.resetPasswordAction,
    onUnMount: _actions.destroyPageAction
  };

  var ResetPasswordContainer = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), _dec2 = (0, _compose2.default)(_hocs.AuthenticationContext), _dec(_class = _dec2(_class = (0, _reactIntl.injectIntl)(_class = (_temp = _class2 = function (_PureComponent) {
    _inherits(ResetPasswordContainer, _PureComponent);

    function ResetPasswordContainer() {
      _classCallCheck(this, ResetPasswordContainer);

      return _possibleConstructorReturn(this, (ResetPasswordContainer.__proto__ || Object.getPrototypeOf(ResetPasswordContainer)).apply(this, arguments));
    }

    _createClass(ResetPasswordContainer, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.onUnMount();
      } // eslint-disable-line react/prefer-stateless-function

    }, {
      key: 'getErrorMessage',
      value: function getErrorMessage() {
        var errorMessage = this.props.ResetPasswordPage.errorMessage;

        if (errorMessage) {
          errorMessage = _messages2.default[errorMessage];
        }

        return errorMessage;
      }
    }, {
      key: 'render',
      value: function render() {
        var formatMessage = this.props.intl.formatMessage;

        var pageTitle = formatMessage(_messages2.default.pageTitle);
        var pageDescription = formatMessage(_messages2.default.pageDescription);

        return _react2.default.createElement(
          'div',
          { className: options.className || 'reset-password-page' },
          _react2.default.createElement(_reactHelmet2.default, {
            title: pageTitle,
            meta: [{ name: 'description', content: pageDescription }]
          }),
          _react2.default.createElement(PageComponent, _extends({ errorMessage: this.getErrorMessage() }, this.props))
        );
      }
    }]);

    return ResetPasswordContainer;
  }(_react.PureComponent), _class2.propTypes = {
    intl: _propTypes2.default.object,
    ResetPasswordPage: _propTypes2.default.object,
    onUnMount: _propTypes2.default.func
  }, _temp)) || _class) || _class) || _class);


  return ResetPasswordContainer;
}