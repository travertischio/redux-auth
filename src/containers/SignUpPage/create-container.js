import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { SubmissionError } from 'redux-form/immutable';
import config from '~/config';
import UserIsNotAuthenticated from '~/hocs/AuthWrappers/UserIsNotAuthenticated';
import selectSignUpPage from './selectors';
import messages from './messages';
import { signUpAction } from './actions';

export default function createSignUpContainer(PageComponent, options = {}) {
  const AuthWrapper = config.signUpAuthWrapper || UserIsNotAuthenticated;

  const mapStateToProps = createStructuredSelector({
    SignUpPage: selectSignUpPage,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => new Promise((resolve, reject) => {
      dispatch(signUpAction(values, resolve, reject));
    }).catch((error) => {
      throw new SubmissionError(error.response && error.response.data);
    }),
  });

  @AuthWrapper
  @connect(mapStateToProps, mapDispatchToProps)
  @injectIntl
  class SignUpContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
    };

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'sign-up-page'}>
          {!options.noHelmet
            && (
              <Helmet
                title={pageTitle}
                meta={[
                  {
                    name: 'description',
                    content: pageDescription,
                  },
                ]}
              />
            )}

          <PageComponent {...this.props} />
        </div>
      );
    }
  }

  return SignUpContainer;
}
