import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import config from '~/config';
import UserIsNotAuthenticated from '~/hocs/AuthWrappers/UserIsNotAuthenticated';
import TokeDataExists from '~/hocs/AuthWrappers/TokeDataExists';
import messages from './messages';
import { confirmCodeAction } from './actions';

export default function createSignInConfirmCodeContainer(PageComponent, options = {}) {
  const AuthWrapper = config.signInAuthWrapper || UserIsNotAuthenticated;

  const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => new Promise((resolve, reject) => {
      dispatch(confirmCodeAction(values, resolve, reject));
    }),
  });

  @TokeDataExists
  @AuthWrapper
  @injectIntl
  @connect(null, mapDispatchToProps)
  class SignInContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
    };

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'sign-in-confirm-code-page'}>
          {!options.noHelmet
            && (
              <Helmet
                title={pageTitle}
                meta={[
                  { name: 'description', content: pageDescription },
                ]}
              />
            )}

          <PageComponent {...this.props} />
        </div>
      );
    }
  }

  return SignInContainer;
}
