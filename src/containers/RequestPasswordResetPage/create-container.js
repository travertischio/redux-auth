import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import selectRequestPasswordResetPage from './selectors';
import messages from './messages';
import {
  requestPasswordResetAction,
  destroyPageAction,
  } from './actions';

export default function createRequestPasswordResetContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    RequestPasswordResetPage: selectRequestPasswordResetPage,
  });

  const mapDispatchToProps = {
    onSubmitForm: requestPasswordResetAction,
    onUnMount: destroyPageAction,
  };

  @connect(mapStateToProps, mapDispatchToProps)
  @injectIntl
  class RequestPasswordResetContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
      RequestPasswordResetPage: PropTypes.object.isRequired,
      onUnMount: PropTypes.func.isRequired,
    };

    componentWillUnmount() {
      this.props.onUnMount();
    }

    getErrorMessage() {
      let errorMessage = this.props.RequestPasswordResetPage.errorMessage;

      if (errorMessage) {
        errorMessage = messages[errorMessage];
      }

      return errorMessage;
    }

    render() {
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div className={options.className || 'request-password-reset-page'}>
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

  return RequestPasswordResetContainer;
}
