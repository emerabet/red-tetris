import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface AdminButtonProps {
  text: string;
}

const AdminButton: React.SFC<AdminButtonProps> = (props) => {

  return (
    <div className={`button-container button_${props.text}`}>
      <div className={`button-text shimmer_${props.text}`}>{props.text}</div>
    </div>

  );
};

export default AdminButton;
