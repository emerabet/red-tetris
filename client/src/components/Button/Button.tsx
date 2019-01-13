import React from 'react';

interface Props {
  handleClick: Function;
  children: any;
}

const Button = (props:Props) => {
  return (
    <button onClick={() => props.handleClick()}>{props.children}</button>
  );
};

export default Button;
