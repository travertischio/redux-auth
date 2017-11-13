export const tokenData = {
  expireAt: '2017-11-08T07:08:17.333781Z',
  key: '16333dfefa35b48a242801aced4925dd93d0ab84',
  status: 'valid',
};
export const userData = {
  email: 'test@test.com',
  id: 10,
};

export const tokenAndUserData = {
  tokenData,
  userData,
};

export const tokenAndUserDataResponse = {
  data: { ...tokenAndUserData },
};

export const stateAuthenticated = {
  auth: {
    tokenData,
    userData,
    isReady: true,
  },
};
