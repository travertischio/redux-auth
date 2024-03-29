import { connectedReduxRedirect as connectedReduxRedirectV3 } from 'redux-auth-wrapper/history3/redirect';
import { connectedReduxRedirect as connectedReduxRedirectV4 } from 'redux-auth-wrapper/history4/redirect';
import config from '~/config';

const connectedReduxRedirect = config.reactRouterVersion === 3 ? connectedReduxRedirectV3 : connectedReduxRedirectV4;

export default connectedReduxRedirect;
export {
  connectedReduxRedirectV3,
  connectedReduxRedirectV4,
};
