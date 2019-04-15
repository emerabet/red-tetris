import React from 'react';

import './style.css';

interface AdminButtonProps {
  text: string;
  play: () => void;
}

const AdminButton: React.SFC<AdminButtonProps> = (props) => {

  return (
    <div className={`button-container button_${props.text}`} onClick={props.play}>
      <div className={`button-text shimmer_${props.text}`}>{props.text}</div>
    </div>

  );
};

export default AdminButton;
