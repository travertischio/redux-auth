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
export default class SignOutPage extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return null;
  }
}
