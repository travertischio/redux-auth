'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSignUpPageDomain = undefined;

var _reselect = require('reselect');

var selectSignUpPageDomain = function selectSignUpPageDomain(state) {
  return state.get('signUpPage');
};

var selectSignUpPage = (0, _reselect.createSelector)(selectSignUpPageDomain, function (substate) {
  return substate.toJS();
});

exports.default = selectSignUpPage;
exports.selectSignUpPageDomain = selectSignUpPageDomain;