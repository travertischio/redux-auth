'use strict';

var _immutable = require('immutable');

var _constants = require('./constants');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SignUpPage reducer', function () {
  describe('call with action: {}', function () {
    it('should return the initial state', function () {
      var initialState = (0, _immutable.fromJS)({
        loading: false,
        errorMessage: false
      });

      expect((0, _reducer2.default)(undefined, {})).toEqual((0, _immutable.fromJS)({}));
      expect((0, _reducer2.default)(initialState, {})).toEqual(initialState);
    });
  });

  describe('call with action: { type: SIGN_UP_ACTION }', function () {
    it('should return { loading: true, errorMessage: false }', function () {
      var initialState = (0, _immutable.fromJS)({
        loading: false,
        errorMessage: true
      });
      var received = (0, _reducer2.default)(initialState, {
        type: _constants.SIGN_UP_ACTION
      });
      var expected = (0, _immutable.fromJS)({
        loading: true,
        errorMessage: false
      });

      expect(received).toEqual(expected);
    });
  });

  describe('call with action: { type: SIGN_UP_SUCCEED_ACTION }', function () {
    it('should return { loading: false, errorMessage: false }', function () {
      var initialState = (0, _immutable.fromJS)({
        loading: true,
        errorMessage: true
      });
      var received = (0, _reducer2.default)(initialState, {
        type: _constants.SIGN_UP_SUCCEED_ACTION
      });
      var expected = (0, _immutable.fromJS)({
        loading: false,
        errorMessage: false
      });

      expect(received).toEqual(expected);
    });
  });

  describe('call with action: { type: SIGN_UP_FAILED_ACTION, payload }', function () {
    it('should return { loading: false, errorMessage: false } for payload.response.status !== 400', function () {
      var initialState = (0, _immutable.fromJS)({
        loading: true
      });
      var payload = {
        response: {}
      };
      var received = (0, _reducer2.default)(initialState, {
        type: _constants.SIGN_UP_SUCCEED_ACTION,
        payload: payload
      });
      var expected = (0, _immutable.fromJS)({
        loading: false,
        errorMessage: false
      });

      expect(received).toEqual(expected);
    });

    it('should return { loading: false, errorMessage: response.data.non_field_errors } for payload.response.status === 400', function () {
      var initialState = (0, _immutable.fromJS)({
        loading: true
      });
      var payload = {
        response: {
          status: 400,
          data: {
            non_field_errors: 'NON_FIELD_ERRORS'
          }
        }
      };
      var received = (0, _reducer2.default)(initialState, {
        type: _constants.SIGN_UP_FAILED_ACTION,
        payload: payload
      }, payload);
      var expected = (0, _immutable.fromJS)({
        loading: false,
        errorMessage: 'NON_FIELD_ERRORS'
      });

      expect(received).toEqual(expected);
    });
  });
});