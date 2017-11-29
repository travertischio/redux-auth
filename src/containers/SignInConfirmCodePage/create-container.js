import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import messages from './messages';
import { confirmCodeAction } from './actions';
import TokeIsValid from '../../hocs/AuthWrappers/TokeIsValid';
import config from '../../config';

export default function createSignInConfirmCodeContainer(PageComponent, options = {}) {
  const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => new Promise((resolve, reject) => {
      dispatch(confirmCodeAction(values, resolve, reject));
    }),
  });

  @TokeIsValid
  @compose(config.signInAuthWrapper)
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
