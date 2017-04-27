'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _SignUpForm = require('../../components/SignUpForm');

var _SignUpForm2 = _interopRequireDefault(_SignUpForm);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * SignUpPage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SignUpPage = exports.SignUpPage = function (_React$PureComponent) {
  _inherits(SignUpPage, _React$PureComponent);

  function SignUpPage() {
    _classCallCheck(this, SignUpPage);

    return _possibleConstructorReturn(this, (SignUpPage.__proto__ || Object.getPrototypeOf(SignUpPage)).apply(this, arguments));
  }

  _createClass(SignUpPage, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      var _props = this.props,
          onSubmitForm = _props.onSubmitForm,
          _props$SignUpPage = _props.SignUpPage,
          loading = _props$SignUpPage.loading,
          errorMessage = _props$SignUpPage.errorMessage;
      var formatMessage = this.props.intl.formatMessage;

      var pageTitle = formatMessage(_messages2.default.pageTitle);
      var pageDescription = formatMessage(_messages2.default.pageDescription);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHelmet2.default, {
          title: pageTitle,
          meta: [{
            name: 'description',
            content: pageDescription
          }]
        }),
        loading && _react2.default.createElement(
          'div',
          null,
          'Processing... Please wait.'
        ),
        errorMessage && _react2.default.createElement(
          'div',
          null,
          errorMessage
        ),
        _react2.default.createElement(_SignUpForm2.default, { onSubmit: onSubmitForm })
      );
    }
  }]);

  return SignUpPage;
}(_react2.default.PureComponent);

SignUpPage.propTypes = {
  SignUpPage: _react.PropTypes.object,
  onSubmitForm: _react.PropTypes.func,
  intl: _react.PropTypes.object.isRequired
};

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  SignUpPage: (0, _selectors2.default)()
});

var mapDispatchToProps = {
  onSubmitForm: _actions.signUpAction
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactIntl.injectIntl)(SignUpPage));