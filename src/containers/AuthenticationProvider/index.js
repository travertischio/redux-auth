/*
 *
 * AuthenticationProvider
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectHasTokenRefreshed,
  selectIsAuthenticated,
} from './selectors';
import { refreshTokenAction } from './actions';

const mapStateToProps = createStructuredSelector({
  hasTokenRefreshed: selectHasTokenRefreshed,
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  refreshToken: refreshTokenAction,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticationProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    hasTokenRefreshed: PropTypes.bool.isRequired,
    refreshToken: PropTypes.func.isRequired,
  };

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
