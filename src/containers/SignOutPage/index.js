/*
 *
 * SignOutPage
 *
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutAction } from './actions';

const mapDispatchToProps = {
  signOut: signOutAction,
};

@connect(null, mapDispatchToProps)
export default class SignOutPage extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return null;
  }
}

SignOutPage.propTypes = {
  signOut: PropTypes.func,
};
