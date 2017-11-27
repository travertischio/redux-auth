/*
 *
 * AuthenticationProvider
 *
 */
// TODO: check if we need pure
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { createStructuredSelector } from 'reselect';
import {
  selectIsReady,
  selectIsAuthenticated,
} from './selectors';
import {
  extendTokenLifetimeAction,
  signOutAction,
} from './actions';
import config from '../../config';

const mapStateToProps = createStructuredSelector({
  isReady: selectIsReady,
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  extendTokenLifetime: extendTokenLifetimeAction,
  signOut: signOutAction,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticationProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    extendTokenLifetime: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isReady: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.extendTokenLifetime();
  }

  componentWillReceiveProps(nextProps) {
    if (config.autoSignOutWithin) {
      if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
        this.runAutoSignOutTimer();
      }

      if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
        this.cancelAutoSignOutTimer();
      }
    }
  }

  runAutoSignOutTimer() {
    console.log('runAutoSignOutTimer');
    this.autoSignOutTimer = setTimeout(
      () => {
        this.cancelAutoSignOutTimer();
        this.props.signOut();
      },
      config.autoSignOutWithin
    );
  }

  resetAutoSignOutTimer() {
    if (this.autoSignOutTimer) {
      console.log('resetAutoSignOutTimer');
      this.cancelAutoSignOutTimer();
      this.runAutoSignOutTimer();
    }
  }

  cancelAutoSignOutTimer() {
    console.log('cancelAutoSignOutTimer');
    clearTimeout(this.autoSignOutTimer);
    this.autoSignOutTimer = null;
  }

  @bind
  handleClick() {
    this.resetAutoSignOutTimer();
  }

  renderLoading() {
    return (
      <div className="loading-auth">
        Loading...
      </div>
    );
  }

  renderChildren() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={this.handleClick}>
        {React.Children.only(this.props.children)}
      </div>
    );
  }

  render() {
    if (this.props.isReady) {
      return this.renderChildren();
    }

    return this.renderLoading();
  }
}
