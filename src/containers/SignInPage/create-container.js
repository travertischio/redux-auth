import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import config from '~/config';
import UserIsNotAuthenticated from '~/hocs/AuthWrappers/UserIsNotAuthenticated';
import selectSignInPage from './selectors';
import messages from './messages';
import {
  signInAction,
  destroyPageAction,
} from './actions';

const AuthWrapper = config.signInAuthWrapper || UserIsNotAuthenticated;

export default function createSignInContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    SignInPage: selectSignInPage,
  });

  const mapDispatchToProps = {
    onSubmitForm: signInAction,
    onUnMount: destroyPageAction,
  };

  @AuthWrapper
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class SignInContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
      onUnMount: PropTypes.func.isRequired,
    };

    componentWillUnmount() {
      this.props.onUnMount();
    }

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'sign-in-page'}>
          {!options.noHelmet &&
            <Helmet
              title={pageTitle}
              meta={[
                { name: 'description', content: pageDescription },
              ]}
            />
          }

          <PageComponent {...this.props} />
        </div>
      );
    }
  }

  return SignInContainer;
}
