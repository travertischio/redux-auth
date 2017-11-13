import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import selectSignInConfirmCodePage from './selectors';
import messages from './messages';
import {
  confirmCodeAction,
  destroyPageAction,
} from './actions';
import TokenIsSet from '../../hocs/AuthWrappers/TokenIsSet';
import config from '../../config';

export default function createSignInConfirmCodeContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    SignInConfirmCodePage: selectSignInConfirmCodePage,
  });

  const mapDispatchToProps = {
    onSubmitForm: confirmCodeAction,
    onUnMount: destroyPageAction,
  };

  @TokenIsSet
  @compose(config.signInAuthWrapper)
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
        <div className={options.className || 'sign-in-confirm-code-page'}>
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
