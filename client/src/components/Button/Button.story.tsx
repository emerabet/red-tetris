import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button handleClick={()=>{}}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button handleClick={()=>{}}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));   