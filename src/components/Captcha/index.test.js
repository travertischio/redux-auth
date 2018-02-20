import React from 'react';
import { createComponentWithIntl } from 'react-unit-testing-utils';
import { setConfig } from '~/config';
import Captcha from './';
import CaptchaField from './field';

describe('<Captcha />', () => {
  it('should render Captcha', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<Captcha onChange={() => true} />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render Captcha with siteKey set by config', () => {
    setConfig({ recaptchaSiteKey: 'ABC1234XYZ' });
    const initialState = {};
    const { component } = createComponentWithIntl(<Captcha onChange={() => true} />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render CaptchaField', () => {
    const initialState = {};
    const { component } = createComponentWithIntl(<CaptchaField input={{ onChange: () => true }} meta={{}} />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
