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

const AuthenticationProviderContext = withContext(
  {
    isAuthenticated: PropTypes.bool,
  },
  (props) => ({
    isAuthenticated: props.isAuthenticated,
  })
);

const mapStateToProps = createStructuredSelector({
  hasTokenRefreshed: selectHasTokenRefreshed,
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  refreshToken: refreshTokenAction,
};

@connect(mapStateToProps, mapDispatchToProps)
@compose(AuthenticationProviderContext)
export default class AuthenticationProvider extends PureComponent {
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
  refreshToken: PropTypes.func,
  children: PropTypes.element,
  hasTokenRefreshed: PropTypes.bool,
};
