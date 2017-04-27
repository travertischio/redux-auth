'use strict';

var _reduxSagaTestPlan = require('redux-saga-test-plan');

var _reduxSagaTestPlan2 = _interopRequireDefault(_reduxSagaTestPlan);

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../AuthenticationProvider/actions');

var _sagas = require('./sagas');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('defaultSaga Saga', function () {
  (0, _reduxSagaTestPlan2.default)(_sagas.defaultSaga).next().takeEveryFork(_constants.SIGN_OUT_ACTION, _sagas.signOutSaga).next().take(_reactRouterRedux.LOCATION_CHANGE).finish().isDone();
}); /**
     * Test  sagas
     */

/* eslint-disable redux-saga/yield-effects */


it('defaultSaga signOutSaga', function () {
  (0, _reduxSagaTestPlan2.default)(_sagas.signOutSaga).next().put((0, _actions.clearTokenAction)()).next().put((0, _reactRouterRedux.push)('/')).finish().isDone();
});