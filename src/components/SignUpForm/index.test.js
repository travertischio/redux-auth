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

    it('should have [name=firstName][type=text] field', () => {
      expect(wrapper.find('[name="firstName"]').length).toBe(1);
    });

    it('should have [name=email][type=email] field', () => {
      expect(wrapper.find('[name="email"]').length).toBe(1);
    });

    it('should have [name=password][type=password] field', () => {
      expect(wrapper.find('[name="password"]').length).toBe(1);
    });

    it('should have [name=confirmPassword][type=password] field', () => {
      expect(wrapper.find('[name="confirmPassword"]').length).toBe(1);
    });
  });
});
