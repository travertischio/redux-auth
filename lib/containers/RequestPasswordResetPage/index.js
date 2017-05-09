'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /*
                   *
                   * RequestPasswordResetPage
                   *
                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _reselect = require('reselect');

var _RequestPasswordResetForm = require('../../components/RequestPasswordResetForm');

var _RequestPasswordResetForm2 = _interopRequireDefault(_RequestPasswordResetForm);

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
  RequestPasswordResetPage: _selectors2.default
});

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: function onSubmitForm(values) {
      return dispatch((0, _actions.requestPasswordResetAction)(values));
    },
    onUnMount: function onUnMount() {
      return dispatch((0, _actions.destroyPageAction)());
    }
  };
};

var RequestPasswordResetPage = (_dec = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _UserIsNotAuthenticated2.default)(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = function (_PureComponent) {
  _inherits(RequestPasswordResetPage, _PureComponent);

  function RequestPasswordResetPage() {
    _classCallCheck(this, RequestPasswordResetPage);

    return _possibleConstructorReturn(this, (RequestPasswordResetPage.__proto__ || Object.getPrototypeOf(RequestPasswordResetPage)).apply(this, arguments));
  }

  _createClass(RequestPasswordResetPage, [{
    key: 'componentWillUnmount',
    // eslint-disable-line react/prefer-stateless-function
    value: function componentWillUnmount() {
      this.props.onUnMount();
    }
  }, {
    key: 'getErrorMessage',
    value: function getErrorMessage() {
      var errorMessage = this.props.RequestPasswordResetPage.errorMessage;

      if (errorMessage) {
        errorMessage = _messages2.default[errorMessage];
      }

      return errorMessage;
    }
  }, {
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
          'p',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.successMessage)
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.successMessageSpamTip)
        )
      );
    }
  }, {
    key: 'renderRequestPasswordResetForm',
    value: function renderRequestPasswordResetForm() {
      var _props = this.props,
          onSubmitForm = _props.onSubmitForm,
          loading = _props.RequestPasswordResetPage.loading;


      var errorMessage = this.getErrorMessage();

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
        _react2.default.createElement(_RequestPasswordResetForm2.default, { onSubmit: onSubmitForm })
      );
    }
  }, {
    key: 'renderInner',
    value: function renderInner() {
      var sent = this.props.RequestPasswordResetPage.sent;

      if (sent) {
        return this.renderSuccessMessage();
      }

      return this.renderRequestPasswordResetForm();
    }
  }, {
    key: 'render',
    value: function render() {
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
        this.renderInner()
      );
    }
  }]);

  return RequestPasswordResetPage;
}(_react.PureComponent)) || _class) || _class) || _class);
exports.default = RequestPasswordResetPage;


RequestPasswordResetPage.propTypes = {
  intl: _propTypes2.default.object,
  RequestPasswordResetPage: _propTypes2.default.object,
  onSubmitForm: _propTypes2.default.func,
  onUnMount: _propTypes2.default.func
};