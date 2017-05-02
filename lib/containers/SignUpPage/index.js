'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /*
                   *
                   * SignUpPage
                   *
                   */

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _SignUpForm = require('../../components/SignUpForm');

var _SignUpForm2 = _interopRequireDefault(_SignUpForm);

var _UserIsNotAuthenticated = require('../../hocs/AuthWrappers/UserIsNotAuthenticated');

var _UserIsNotAuthenticated2 = _interopRequireDefault(_UserIsNotAuthenticated);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = (0, _reselect.createStructuredSelector)({
  SignUpPage: (0, _selectors2.default)()
});

var mapDispatchToProps = {
  onSubmitForm: _actions.signUpAction
};

var SignUpPage = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _UserIsNotAuthenticated2.default)(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = function (_PureComponent) {
  _inherits(SignUpPage, _PureComponent);

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

      return React.createElement(
        'div',
        null,
        React.createElement(_reactHelmet2.default, {
          title: pageTitle,
          meta: [{
            name: 'description',
            content: pageDescription
          }]
        }),
        loading && React.createElement(
          'div',
          null,
          'Processing... Please wait.'
        ),
        errorMessage && React.createElement(
          'div',
          null,
          errorMessage
        ),
        React.createElement(_SignUpForm2.default, { onSubmit: onSubmitForm })
      );
    }
  }]);

  return SignUpPage;
}(_react.PureComponent)) || _class) || _class) || _class);
exports.default = SignUpPage;


SignUpPage.propTypes = {
  SignUpPage: _propTypes2.default.object,
  onSubmitForm: _propTypes2.default.func,
  intl: _propTypes2.default.object
};