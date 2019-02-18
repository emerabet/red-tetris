import React, { Component, useState, useEffect } from 'react';

interface StarProps {
  additionalClassName?: String;
}

const Star: React.SFC<StarProps> = (props) => {
  return (
        <svg viewBox="0 0 512 512" width="20" height="20" {...props}>
            <path fill="currentColor"
                d="M256 13l79 160 177 26-128 124 30 176-158-83-158 83
                30-176L0 199l177-26 79-160z" />
        </svg>
  );
};

export default Star;
