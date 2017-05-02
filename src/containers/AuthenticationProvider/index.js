/*
 *
 * AuthenticationProvider
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import withContext from 'recompose/withContext';
import { selectHasTokenRefreshed, selectIsAuthenticated } from './selectors';
import { refreshTokenAction } from './actions';

class AuthenticationProvider extends PureComponent {

  componentDidMount() {
    this.props.refreshToken();
  }

  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  renderChildren() {
    return (
      <div>
        {React.Children.only(this.props.children)}
      </div>
    );
  }

  render() {
    if (this.props.hasTokenRefreshed) {
      return this.renderChildren();
    }

    return this.renderLoading();
  }
}

AuthenticationProvider.propTypes = {
  refreshToken: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  hasTokenRefreshed: PropTypes.bool.isRequired,
};

const AuthenticationProviderContext = withContext(
  {
    isAuthenticated: PropTypes.bool,
  },
  (props) => ({
    isAuthenticated: props.isAuthenticated,
  })
);

const composedComponent = compose(AuthenticationProviderContext)(AuthenticationProvider);

const mapStateToProps = createStructuredSelector({
  hasTokenRefreshed: selectHasTokenRefreshed,
  isAuthenticated: selectIsAuthenticated,
});

const mappedDispatch = {
  refreshToken: refreshTokenAction,
};

export default connect(mapStateToProps, mappedDispatch)(composedComponent);
