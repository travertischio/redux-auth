import React from 'react';
import { shallow } from 'enzyme';

import { SignUpForm } from './index';

describe('<SignUpForm />', () => {
  const defaultProps = {
    handleSubmit: jest.fn(),
    valid: true,
    pristine: true,
    submitting: false,
    intl: {
      formatMessage: jest.fn(),
    },
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm {...defaultProps} />);
  });

  describe('<form /> element', () => {
    let form;

    beforeEach(() => {
      form = wrapper.find('form');
    });

    it('it renders a <form /> element', () => {
      expect(form.length).toBe(1);
    });

    it('uses handleSubmit in onSubmit handler', () => {
      expect(defaultProps.handleSubmit).not.toHaveBeenCalled();

      form.props().onSubmit();

      expect(defaultProps.handleSubmit).toHaveBeenCalled();
    });

    it('it renders one submit <button /> component', () => {
      expect(wrapper.find('button[type="submit"]').length).toBe(1);
    });
  });

  describe('form content:', () => {
    let input;

    it('should have [name=first_name][type=text] field', () => {
      input = wrapper.find('[name="first_name"]');

      expect(input.props().type).toBe('text');
    });

    it('should have [name=email][type=email] field', () => {
      input = wrapper.find('[name="email"]');

      expect(input.props().type).toBe('email');
    });

    it('should have [name=password][type=password] field', () => {
      input = wrapper.find('[name="password"]');

      expect(input.props().type).toBe('password');
    });

    it('should have [name=confirm_password][type=password] field', () => {
      input = wrapper.find('[name="confirm_password"]');

      expect(input.props().type).toBe('password');
    });
  });
});
