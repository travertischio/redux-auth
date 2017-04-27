'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<SignUpForm />', function () {
  var defaultProps = {
    handleSubmit: jest.fn(),
    valid: true,
    pristine: true,
    submitting: false,
    intl: {
      formatMessage: jest.fn()
    }
  };
  var wrapper = void 0;

  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.SignUpForm, defaultProps));
  });

  describe('<form /> element', function () {
    var form = void 0;

    beforeEach(function () {
      form = wrapper.find('form');
    });

    it('it renders a <form /> element', function () {
      expect(form.length).toBe(1);
    });

    it('uses handleSubmit in onSubmit handler', function () {
      expect(defaultProps.handleSubmit).not.toHaveBeenCalled();

      form.props().onSubmit();

      expect(defaultProps.handleSubmit).toHaveBeenCalled();
    });

    it('it renders one submit <button /> component', function () {
      expect(wrapper.find('button[type="submit"]').length).toBe(1);
    });
  });

  describe('form content:', function () {
    var input = void 0;

    it('should have [name=first_name][type=text] field', function () {
      input = wrapper.find('[name="first_name"]');

      expect(input.props().type).toBe('text');
    });

    it('should have [name=email][type=email] field', function () {
      input = wrapper.find('[name="email"]');

      expect(input.props().type).toBe('email');
    });

    it('should have [name=password][type=password] field', function () {
      input = wrapper.find('[name="password"]');

      expect(input.props().type).toBe('password');
    });

    it('should have [name=confirm_password][type=password] field', function () {
      input = wrapper.find('[name="confirm_password"]');

      expect(input.props().type).toBe('password');
    });
  });
});