import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import selectSignUpPage from './selectors';
import messages from './messages';
import { signUpAction } from './actions';
import config from '../../config';

export default function createSignUpContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    SignUpPage: selectSignUpPage,
  });

  const mapDispatchToProps = {
    onSubmitForm: signUpAction,
  };

  @UserIsNotAuthenticated(config.redirectPathAfterSignUp)
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class SignUpContainer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      intl: PropTypes.object,
    };

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'sign-up-page'}>
          <Helmet
            title={pageTitle}
            meta={[
              {
                name: 'description',
                content: pageDescription,
              },
            ]}
          />

          <PageComponent {...this.props} />
        </div>
      );
    }
  }

  return SignUpContainer;
}
