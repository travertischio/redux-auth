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
import moment from 'moment';
import {
  selectIsReady,
  selectIsAuthenticated,
} from './selectors';
import {
  extendTokenLifetimeAction,
  signOutAction,
} from './actions';
import {
  setItemInStorage,
  getItemFromStorage,
} from './utils';
import { LAST_ACTIVE_KEY } from './constants';
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
        this.setLastActive();
        this.runAutoSignOutTimer();
      }

      if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
        this.cancelAutoSignOutTimer();
      }
    }
  }

  componentWillUnmount() {
    this.cancelAutoSignOutTimer();
  }

  getLastActive() {
    return getItemFromStorage(LAST_ACTIVE_KEY);
  }

  setLastActive() {
    return setItemInStorage(LAST_ACTIVE_KEY, moment().valueOf());
  }

  /**
  * Function calculates time to auto sign out (in ms) based on last active time.
  * Thanks to this each tab will be signed out at the same time.
  */
  getTimeToAutoSignOut() {
    const lastActive = this.getLastActive();

    if (lastActive) {
      const expireWithinMs = config.autoSignOutWithin - (moment().valueOf() - lastActive);

      return Math.max(0, expireWithinMs);
    }

    return config.autoSignOutWithin;
  }

  /**
  * Function detects if a user is active by last active date saved in localStorage.
  * Why in localStorage? Because the user might use multiple tabs in the browser
  * and we have to exchange last active date between tabs.
  */
  userIsNotActive() {
    const lastActive = this.getLastActive();

    return !lastActive || lastActive <= moment().subtract(config.autoSignOutWithin).valueOf();
  }

  runAutoSignOutTimer() {
    this.autoSignOutTimer = setTimeout(
      () => {
        if (this.userIsNotActive()) {
          this.cancelAutoSignOutTimer();
          this.props.signOut();
        } else {
          this.runAutoSignOutTimer();
        }
      },
      this.getTimeToAutoSignOut()
    );
  }

  resetAutoSignOutTimer() {
    if (this.autoSignOutTimer) {
      this.cancelAutoSignOutTimer();
      this.setLastActive();
      this.runAutoSignOutTimer();
    }
  }

  cancelAutoSignOutTimer() {
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
