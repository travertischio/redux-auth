'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /*
                   *
                   * SignInPage
                   *
                   */

// import UserIsNotAuthenticated from 'hocs/AuthWrappers/UserIsNotAuthenticated';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _SignInForm = require('../../components/SignInForm');

var _SignInForm2 = _interopRequireDefault(_SignInForm);

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
  SignInPage: (0, _selectors2.default)()
});

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: function onSubmitForm(values) {
      return dispatch((0, _actions.signInAction)(values));
    },
    onUnMount: function onUnMount() {
      return dispatch((0, _actions.destroyPageAction)());
    }
  };
};

// @UserIsNotAuthenticated
var SignInPage = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactIntl.injectIntl)(_class = _dec(_class = function (_PureComponent) {
  _inherits(SignInPage, _PureComponent);

  function SignInPage() {
    _classCallCheck(this, SignInPage);

    return _possibleConstructorReturn(this, (SignInPage.__proto__ || Object.getPrototypeOf(SignInPage)).apply(this, arguments));
  }

  _createClass(SignInPage, [{
    key: 'componentWillUnmount',
    // eslint-disable-line react/prefer-stateless-function

    value: function componentWillUnmount() {
      this.props.onUnMount();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onSubmitForm = _props.onSubmitForm,
          _props$SignInPage = _props.SignInPage,
          loading = _props$SignInPage.loading,
          errorMessage = _props$SignInPage.errorMessage;
      var formatMessage = this.props.intl.formatMessage;

      var pageTitle = formatMessage(_messages2.default.pageTitle);
      var pageDescription = formatMessage(_messages2.default.pageDescription);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactHelmet2.default, {
          title: pageTitle,
          meta: [{ name: 'description', content: pageDescription }]
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
        _react2.default.createElement(_SignInForm2.default, { onSubmit: onSubmitForm })
      );
    }
  }]);

  return SignInPage;
}(_react.PureComponent)) || _class) || _class);
exports.default = SignInPage;


SignInPage.propTypes = {
  intl: _react.PropTypes.object,
  SignInPage: _react.PropTypes.object,
  onSubmitForm: _react.PropTypes.func,
  onUnMount: _react.PropTypes.func
};