import config, { setConfig } from './';

describe('redux-auth config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  describe('when calling setConfig(newConfig)', () => {
    const configClone = { ...config };
    const newConfig = {
      adminRole: '20_admin',
      redirectPathAfterSignOut: '/',
    };

    beforeEach(() => {
      setConfig(newConfig);
    });

    it('should adminRole be equal to "20_admin"', () => {
      expect(config.adminRole).toEqual(newConfig.adminRole);
    });

    it('should redirectPathAfterSignOut be equal to "/"', () => {
      expect(config.redirectPathAfterSignOut).toEqual(newConfig.redirectPathAfterSignOut);
    });

    it('should updated config has other configurations', () => {
      Object.entries(configClone).forEach(([key, value]) => {
        if (!Object.keys(newConfig).includes(key)) {
          expect(config[key]).toEqual(value);
        }
      });
    });
  });

  describe('when calling setConfig(newConfig) with new redirectPathAfterSignIn and redirectPathAfterSignUp', () => {
    let signInAuthWrapperOld = null;
    let signUpAuthWrapperOld = null;
    const newConfig = {
      redirectPathAfterSignIn: '/home',
      redirectPathAfterSignUp: '/home',
    };

    beforeEach(() => {
      signInAuthWrapperOld = config.signInAuthWrapper;
      signUpAuthWrapperOld = config.signUpAuthWrapper;

      setConfig(newConfig);
    });

    it('should update signInAuthWrapper', () => {
      expect(signInAuthWrapperOld).not.toBe(config.signInAuthWrapper);
    });

    it('should update signUpAuthWrapper', () => {
      expect(signUpAuthWrapperOld).not.toBe(config.signUpAuthWrapper);
    });

    it('should signInAuthWrapper be a function', () => {
      expect(typeof config.signInAuthWrapper === 'function').toBeTruthy();
    });

    it('should signUpAuthWrapper be a function', () => {
      expect(typeof config.signUpAuthWrapper === 'function').toBeTruthy();
    });
  });
});
