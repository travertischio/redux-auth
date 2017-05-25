'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSignUpContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

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

function createSignUpContainer(FormComponent) {
  var _dec, _class, _class2, _temp;

  var mapStateToProps = (0, _reselect.createStructuredSelector)({
    SignUpPage: _selectors2.default
  });

  var mapDispatchToProps = {
    onSubmitForm: _actions.signUpAction
  };

  var SignUpContainer = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _UserIsNotAuthenticated2.default)(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_PureComponent) {
    _inherits(SignUpContainer, _PureComponent);

    function SignUpContainer() {
      _classCallCheck(this, SignUpContainer);

      return _possibleConstructorReturn(this, (SignUpContainer.__proto__ || Object.getPrototypeOf(SignUpContainer)).apply(this, arguments));
    }

    _createClass(SignUpContainer, [{
      key: 'render',
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
          _react2.default.createElement(FormComponent, { onSubmit: onSubmitForm })
        );
      } // eslint-disable-line react/prefer-stateless-function

    }]);

    return SignUpContainer;
  }(_react.PureComponent), _class2.propTypes = {
    SignUpPage: _propTypes2.default.object,
    onSubmitForm: _propTypes2.default.func,
    intl: _propTypes2.default.object
  }, _temp)) || _class) || _class) || _class);


  return SignUpContainer;
}