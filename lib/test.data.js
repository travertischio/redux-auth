'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var validTokenData = exports.validTokenData = {
  expireAt: '2017-11-08T07:08:17.333781Z',
  key: '16333dfefa35b48a242801aced4925dd93d0ab84',
  status: 'valid'
};
var userData = exports.userData = {
  email: 'test@test.com',
  id: 10
};

var tokenAndUserData = exports.tokenAndUserData = {
  userData: userData,
  tokenData: validTokenData
};

var tokenAndUserDataResponse = exports.tokenAndUserDataResponse = {
  data: _extends({}, tokenAndUserData)
};

var stateAuthenticated = exports.stateAuthenticated = {
  auth: {
    isReady: true,
    tokenData: validTokenData,
    userData: userData
  }
};