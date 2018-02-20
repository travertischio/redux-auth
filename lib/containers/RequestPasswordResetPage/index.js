'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    *
                    * RequestPasswordResetPage
                    *
                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _RequestPasswordResetForm = require('../../components/RequestPasswordResetForm');

var _RequestPasswordResetForm2 = _interopRequireDefault(_RequestPasswordResetForm);

var _createContainer = require('./create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestPasswordResetPage = (_temp = _class = function (_PureComponent) {
  _inherits(RequestPasswordResetPage, _PureComponent);

  function RequestPasswordResetPage() {
    _classCallCheck(this, RequestPasswordResetPage);

    return _possibleConstructorReturn(this, (RequestPasswordResetPage.__proto__ || Object.getPrototypeOf(RequestPasswordResetPage)).apply(this, arguments));
  }

  _createClass(RequestPasswordResetPage, [{
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
          loading = _props.RequestPasswordResetPage.loading,
          errorMessage = _props.errorMessage;


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
    key: 'render',
    value: function render() {
      if (this.props.RequestPasswordResetPage.sent) {
        return this.renderSuccessMessage();
      }

      return this.renderRequestPasswordResetForm();
    }
  }]);

  return RequestPasswordResetPage;
}(_react.PureComponent), _class.propTypes = {
  RequestPasswordResetPage: _propTypes2.default.object.isRequired,
  onSubmitForm: _propTypes2.default.func.isRequired,
  errorMessage: _propTypes2.default.object
}, _class.defaultProps = {
  errorMessage: null
}, _temp);
exports.default = (0, _createContainer2.default)(RequestPasswordResetPage);