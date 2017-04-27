'use strict';

var _actions = require('./actions');

var _constants = require('./constants');

describe('SignOutPage actions', function () {
  describe('signOutAction', function () {
    it('has a type of SIGN_OUT_ACTION', function () {
      var expected = {
        type: _constants.SIGN_OUT_ACTION
      };
      expect((0, _actions.signOutAction)()).toEqual(expected);
    });
  });
});