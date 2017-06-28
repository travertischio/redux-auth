import config, { setConfig } from './';

describe('redux-auth config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  describe('when calling setConfig(newConfig)', () => {
    const configClone = { ...config };
    const newConfig = {
      redirectPathAfterSignIn: '/home',
      redirectPathAfterSignUp: '/home',
    };
    setConfig(newConfig);

    it('should redirectPathAfterSignIn be equal to "home"', () => {
      expect(config.redirectPathAfterSignIn).toEqual(newConfig.redirectPathAfterSignIn);
    });

    it('should redirectPathAfterSignUp be equal to "home"', () => {
      expect(config.redirectPathAfterSignIn).toEqual(newConfig.redirectPathAfterSignIn);
    });

    it('should updated config has other configurations', () => {
      Object.entries(configClone).forEach(([key, value]) => {
        if (!Object.keys(newConfig).includes(key)) {
          expect(config[key]).toEqual(value);
        }
      });
    });
  });
});
