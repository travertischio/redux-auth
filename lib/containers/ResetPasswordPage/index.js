'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    *
                    * ResetPasswordPage
                    *
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _reactRouterDom = require('react-router-dom');

var _createContainer = require('./create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

var _ResetPasswordForm = require('../../components/ResetPasswordForm');

var _ResetPasswordForm2 = _interopRequireDefault(_ResetPasswordForm);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPasswordPage = (_temp = _class = function (_PureComponent) {
  _inherits(ResetPasswordPage, _PureComponent);

  function ResetPasswordPage() {
    _classCallCheck(this, ResetPasswordPage);

    return _possibleConstructorReturn(this, (ResetPasswordPage.__proto__ || Object.getPrototypeOf(ResetPasswordPage)).apply(this, arguments));
  }

  _createClass(ResetPasswordPage, [{
    key: 'renderSuccessMessage',
    value: function renderSuccessMessage() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.successHeader)
        ),
        _react2.default.createElement(
          'div',
          null,
          this.renderGoNextBtn()
        )
      );
    }
  }, {
    key: 'renderGoNextBtn',
    value: function renderGoNextBtn() {
      if (this.props.isAuthenticated) {
        return _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/home' },
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.goToHomeBtnLabel)
        );
      }

      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/sign-in' },
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.goToSignInBtnLabel)
      );
    }
  }, {
    key: 'renderFormOrError',
    value: function renderFormOrError() {
      var loading = this.props.ResetPasswordPage.loading;
      var errorMessage = this.props.errorMessage;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.header)
        ),
        loading && _react2.default.createElement(
          'div',
          null,
          'Processing... Please wait.'
        ),
        errorMessage && _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, errorMessage)
        ),
        this.renderFormOrErrorInner()
      );
    }
  }, {
    key: 'renderFormOrErrorInner',
    value: function renderFormOrErrorInner() {
      var invalidToken = this.props.ResetPasswordPage.invalidToken;

      if (invalidToken) {
        return this.renderGoToRequestPasswordPageLink();
      }

      return this.renderForm();
    }
  }, {
    key: 'renderGoToRequestPasswordPageLink',
    value: function renderGoToRequestPasswordPageLink() {
      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/request-password-reset' },
        _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.requestNewPasswordBtnLabel)
      );
    }
  }, {
    key: 'renderForm',
    value: function renderForm() {
      var onSubmitForm = this.props.onSubmitForm;


      var initialValues = {
        token: this.props.routeParams.resetPasswordToken
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ResetPasswordForm2.default, {
          onSubmit: onSubmitForm,
          initialValues: initialValues
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var success = this.props.ResetPasswordPage.success;

      if (success) {
        return this.renderSuccessMessage();
      }

      return this.renderFormOrError();
    }
  }]);

  return ResetPasswordPage;
}(_react.PureComponent), _class.propTypes = {
  ResetPasswordPage: _propTypes2.default.object.isRequired,
  routeParams: _propTypes2.default.object.isRequired,
  isAuthenticated: _propTypes2.default.bool.isRequired,
  onSubmitForm: _propTypes2.default.func.isRequired,
  errorMessage: _propTypes2.default.object
}, _class.defaultProps = {
  errorMessage: null
}, _temp);
exports.default = (0, _createContainer2.default)(ResetPasswordPage);