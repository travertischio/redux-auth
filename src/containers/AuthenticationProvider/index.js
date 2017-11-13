/*
 *
 * AuthenticationProvider
 *
 */
// TODO: check if we need pure
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectIsReady,
  selectIsAuthenticated,
} from './selectors';
import { extendTokenLifetimeAction } from './actions';

const mapStateToProps = createStructuredSelector({
  isReady: selectIsReady,
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  extendTokenLifetime: extendTokenLifetimeAction,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthenticationProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isReady: PropTypes.bool.isRequired,
    extendTokenLifetime: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.extendTokenLifetime();
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
    if (this.props.isReady) {
      return this.renderChildren();
    }

    return this.renderLoading();
  }
}
