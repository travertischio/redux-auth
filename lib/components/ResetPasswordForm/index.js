'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _immutable = require('redux-form/immutable');

var _reduxForm = require('react-form-fields/lib/PasswordField/reduxForm');

var _reduxForm2 = _interopRequireDefault(_reduxForm);

var _required = require('validators/lib/required');

var _setOfPasswordValidators = require('validators/lib/setOfPasswordValidators');

var _matchToNewPassword = require('validators/lib/matchToNewPassword');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ResetPasswordForm(props) {
  var handleSubmit = props.handleSubmit,
      pristine = props.pristine,
      submitting = props.submitting;
  var formatMessage = props.intl.formatMessage;

  var newPasswordLabel = formatMessage(_messages2.default.newPasswordLabel);
  var newPasswordPlaceholder = formatMessage(_messages2.default.newPasswordPlaceholder);
  var reNewPassword = formatMessage(_messages2.default.reNewPassword);
  var reNewPasswordPlaceholder = formatMessage(_messages2.default.reNewPasswordPlaceholder);

  var onSubmit = function onSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    handleSubmit();
  };

  return _react2.default.createElement(
    'form',
    { onSubmit: onSubmit, noValidate: true },
    _react2.default.createElement(_immutable.Field, {
      id: 'newPassword',
      name: 'newPassword',
      label: newPasswordLabel,
      placeholder: newPasswordPlaceholder,
      validate: _setOfPasswordValidators.setOfPasswordValidators,
      component: _reduxForm2.default
    }),
    _react2.default.createElement(_immutable.Field, {
      id: 'reNewPassword',
      name: 'reNewPassword',
      label: reNewPassword,
      placeholder: reNewPasswordPlaceholder,
      validate: [_required.required, _matchToNewPassword.matchToNewPassword],
      component: _reduxForm2.default
    }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        {
          type: 'submit',
          disabled: pristine || submitting
        },
        'Save'
      )
    )
  );
} /**
  *
  * ResetPasswordForm
  *
  */

ResetPasswordForm.propTypes = {
  handleSubmit: _propTypes2.default.func.isRequired,
  intl: _propTypes2.default.object.isRequired,
  pristine: _propTypes2.default.bool.isRequired,
  submitting: _propTypes2.default.bool.isRequired
};

exports.default = (0, _immutable.reduxForm)({
  form: 'resetPasswordForm'
})((0, _reactIntl.injectIntl)(ResetPasswordForm));