import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from '../AuthenticationProvider/selectors';
import selectResetPasswordPage from './selectors';
import messages from './messages';
import {
  resetPasswordAction,
  destroyPageAction,
} from './actions';

export default function createResetPasswordContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    ResetPasswordPage: selectResetPasswordPage,
    isAuthenticated: selectIsAuthenticated,
  });

  const mapDispatchToProps = {
    onSubmitForm: resetPasswordAction,
    onUnMount: destroyPageAction,
  };

  @connect(mapStateToProps, mapDispatchToProps)
  @injectIntl
  class ResetPasswordContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
      ResetPasswordPage: PropTypes.object.isRequired,
      onUnMount: PropTypes.func.isRequired,
    };

    componentWillUnmount() {
      this.props.onUnMount();
    }

    getErrorMessage() {
      let { errorMessage } = this.props.ResetPasswordPage;

      if (this.props.ResetPasswordPage.errorMessage) {
        errorMessage = messages[errorMessage];
      }

      return errorMessage;
    }

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'reset-password-page'}>
          {!options.noHelmet &&
            <Helmet
              title={pageTitle}
              meta={[
                { name: 'description', content: pageDescription },
              ]}
            />
          }

          <PageComponent errorMessage={this.getErrorMessage()} {...this.props} />
        </div>
      );
    }
  }

  return ResetPasswordContainer;
}
