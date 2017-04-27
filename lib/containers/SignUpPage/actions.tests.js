'use strict';

var _actions = require('./actions');

var _constants = require('./constants');

describe('SignUpPage actions', function () {
  var payload = {
    string: 'STRING',
    number: 1,
    object: {}
  };

  it('signUpAction should return SIGN_UP_ACTION type and payload', function () {
    var expected = {
      type: _constants.SIGN_UP_ACTION,
      payload: payload
    };

    expect((0, _actions.signUpAction)(payload)).toEqual(expected);
  });

  it('signUpAction should return SIGN_UP_SUCCEED_ACTION type and payload', function () {
    var expected = {
      type: _constants.SIGN_UP_SUCCEED_ACTION,
      payload: payload
    };

    expect((0, _actions.signUpSucceedAction)(payload)).toEqual(expected);
  });

  it('signUpAction should return SIGN_UP_FAILED_ACTION type and payload', function () {
    var expected = {
      type: _constants.SIGN_UP_FAILED_ACTION,
      payload: payload
    };

    expect((0, _actions.signUpFailedAction)(payload)).toEqual(expected);
  });
});