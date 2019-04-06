import React from 'react';
import './style.css';

interface Props {
  handleClick: Function;
  children: any;
}

const Button = (props: Props) => {
  return (
    <button className="button_format" onClick={() => props.handleClick()}>
        {props.children}
    </button>
  );
};

export default Button;
