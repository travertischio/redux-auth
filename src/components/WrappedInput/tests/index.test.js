import React from 'react';
import { shallow } from 'enzyme';

import WrappedInput from '../index';

const fieldProps = {
  input: { name: 'example-input' },
  id: 'example',
  label: 'Example Label',
  placeholder: 'Example placeholder',
  type: 'text',
  meta: {
    asyncValidating: false,
    touched: true,
    error: 'Field required',
  },
};

describe('<WrappedInput />', () => {
  it('should render a label', () => {
    const { input, type, id, placeholder } = fieldProps;
    expect(rednerValidField(fieldProps).contains(<input
      {...input}
      type={type}
      id={id}
      placeholder={placeholder}
    />)).toBe(true);
  });

  it('should render a label', () => {
    const { id, label } = fieldProps;
    expect(rednerValidField(fieldProps).contains(<label htmlFor={id}>{label}</label>)).toBe(true);
  });

  it('should render a FormError', () => {
    expect(rednerValidField(fieldProps).find('FormError').length).toBe(1);
  });
});

function rednerValidField(props) {
  return shallow(
    <WrappedInput {...props} />
  );
}
