'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('redux-form/immutable');

var _createContainer = require('./create-container');

var _createContainer2 = _interopRequireDefault(_createContainer);

var _SignInConfirmCodeForm = require('../../components/SignInConfirmCodeForm');

var _SignInConfirmCodeForm2 = _interopRequireDefault(_SignInConfirmCodeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SignInConfirmCodePage(props) {
  var handleSubmit = function handleSubmit(values) {
    return props.onSubmitForm(values).catch(function (error) {
      throw new _immutable.SubmissionError(error.response && error.response.data);
    });
  };

  return _react2.default.createElement(_SignInConfirmCodeForm2.default, { onSubmit: handleSubmit });
} /*
   *
   * SignInConfirmCodePage
   *
   */


SignInConfirmCodePage.propTypes = {
  onSubmitForm: _propTypes2.default.func.isRequired
};

exports.default = (0, _createContainer2.default)(SignInConfirmCodePage);