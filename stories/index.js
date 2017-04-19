import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Demo from './demo';

storiesOf('Demo', module)
  .add('of sample', () => (
    <Demo showApp={linkTo('Demo')}/>
  ));
