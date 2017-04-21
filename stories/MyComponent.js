import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MyComponent from '../src/MyComponent';

storiesOf('MyComponent', module)
  .add('without text prop', () => (
    <MyComponent />
  ))
  .add('with text prop', () => (
    <MyComponent text="TEXT_PROP" />
  ));
