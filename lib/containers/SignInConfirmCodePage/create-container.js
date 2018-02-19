'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSignInConfirmCodeContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactIntl = require('react-intl');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _UserIsNotAuthenticated = require('../../hocs/AuthWrappers/UserIsNotAuthenticated');

var _UserIsNotAuthenticated2 = _interopRequireDefault(_UserIsNotAuthenticated);

var _TokeDataExists = require('../../hocs/AuthWrappers/TokeDataExists');

var _TokeDataExists2 = _interopRequireDefault(_TokeDataExists);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthWrapper = _config2.default.signInAuthWrapper || _UserIsNotAuthenticated2.default;

function createSignInConfirmCodeContainer(PageComponent) {
  var _dec, _class, _class2, _temp;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onSubmitForm: function onSubmitForm(values) {
        return new Promise(function (resolve, reject) {
          dispatch((0, _actions.confirmCodeAction)(values, resolve, reject));
        });
      }
    };
  };

  var SignInContainer = (_dec = (0, _reactRedux.connect)(null, mapDispatchToProps), (0, _TokeDataExists2.default)(_class = AuthWrapper(_class = (0, _reactIntl.injectIntl)(_class = _dec(_class = (_temp = _class2 = function (_PureComponent) {
    _inherits(SignInContainer, _PureComponent);

    function SignInContainer() {
      _classCallCheck(this, SignInContainer);

      return _possibleConstructorReturn(this, (SignInContainer.__proto__ || Object.getPrototypeOf(SignInContainer)).apply(this, arguments));
    }

    _createClass(SignInContainer, [{
      key: 'render',
      value: function render() {
        var formatMessage = this.props.intl.formatMessage;

        var pageTitle = formatMessage(_messages2.default.pageTitle);
        var pageDescription = formatMessage(_messages2.default.pageDescription);

        return _react2.default.createElement(
          'div',
          { className: options.className || 'sign-in-confirm-code-page' },
          !options.noHelmet && _react2.default.createElement(_reactHelmet2.default, {
            title: pageTitle,
            meta: [{ name: 'description', content: pageDescription }]
          }),
          _react2.default.createElement(PageComponent, this.props)
        );
      }
    }]);

    return SignInContainer;
  }(_react.PureComponent), _class2.propTypes = {
    intl: _propTypes2.default.object.isRequired
  }, _temp)) || _class) || _class) || _class) || _class);


  return SignInContainer;
}