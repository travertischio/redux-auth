/* @flow */

import React, { PureComponent } from 'react'

export default class MyComponent extends PureComponent {
  static defaultProps: {
    text: 'DEFAULT_TEXT',
  };

  props: {
    text: string,
  };

  render() {
    return (
      <div>
        <h2>This is sample component to work on!</h2>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
