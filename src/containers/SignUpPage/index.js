/*
 *
 * SignUpPage
 *
 */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import SignUpForm from '../../components/SignUpForm';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import makeSelectSignUpPage from './selectors';
import messages from './messages';
import { signUpAction } from './actions';

const mapStateToProps = createStructuredSelector({
  SignUpPage: makeSelectSignUpPage(),
});

const mapDispatchToProps = {
  onSubmitForm: signUpAction,
};

@UserIsNotAuthenticated
@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class SignUpPage extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onSubmitForm,
      SignUpPage: {
        loading,
        errorMessage,
      },
    } = this.props;
    const { formatMessage } = this.props.intl;
    const pageTitle = formatMessage(messages.pageTitle);
    const pageDescription = formatMessage(messages.pageDescription);

    return (
      <div>
        <Helmet
          title={pageTitle}
          meta={[
            {
              name: 'description',
              content: pageDescription,
            },
          ]}
        />

        { loading && <div>Processing... Please wait.</div> }
        { errorMessage && <div>{errorMessage}</div> }

        <SignUpForm onSubmit={onSubmitForm} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  SignUpPage: PropTypes.object,
  onSubmitForm: PropTypes.func,
  intl: PropTypes.object,
};
