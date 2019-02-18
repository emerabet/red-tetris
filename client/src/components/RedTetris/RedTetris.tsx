import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface RedTetrisProps {
  additionalClassName?: String;
}

const RedTetris: React.SFC<RedTetrisProps> = (props) => {
  return (
    <div
      className={`redTetris ${props.additionalClassName !== undefined
        ? props.additionalClassName : ''}`}>
      <div className="box boxR">
        <div className="boxCube boxR1"></div>
        <div className="boxCube boxR2"></div>
        <div className="boxCube boxR3"></div>
        <div className="boxCube boxR4"></div>
        <div className="boxCube boxR5"></div>
        <div className="boxCube boxR6"></div>
        <div className="boxCube boxR7"></div>
        <div className="boxCube boxR8"></div>
        <div className="boxCube boxR9"></div>
        <div className="boxCube boxR10"></div>
        <div className="boxCube boxR11"></div>
        <div className="boxCube boxR12"></div>
        <div className="boxCube boxR13"></div>
        <div className="boxCube boxR14"></div>
      </div>
      <div className="box boxE">
        <div className="boxCube boxE1"></div>
        <div className="boxCube boxE2"></div>
        <div className="boxCube boxE3"></div>
        <div className="boxCube boxE4"></div>
        <div className="boxCube boxE5"></div>
        <div className="boxCube boxE6"></div>
        <div className="boxCube boxE7"></div>
        <div className="boxCube boxE8"></div>
        <div className="boxCube boxE9"></div>
        <div className="boxCube boxE10"></div>
        <div className="boxCube boxE11"></div>
        <div className="boxCube boxE12"></div>
        <div className="boxCube boxE13"></div>
      </div>
      <div className="box boxD">
        <div className="boxCube boxD1"></div>
        <div className="boxCube boxD2"></div>
        <div className="boxCube boxD3"></div>
        <div className="boxCube boxD4"></div>
        <div className="boxCube boxD5"></div>
        <div className="boxCube boxD6"></div>
        <div className="boxCube boxD7"></div>
        <div className="boxCube boxD8"></div>
        <div className="boxCube boxD9"></div>
        <div className="boxCube boxD10"></div>
        <div className="boxCube boxD11"></div>
        <div className="boxCube boxD12"></div>
      </div>
      <div className="titleSpace">
      </div>
      <div className="boxs boxT">
        <div className="boxCube boxT1"></div>
        <div className="boxCube boxT2"></div>
        <div className="boxCube boxT3"></div>
        <div className="boxCube boxT4"></div>
        <div className="boxCube boxT5"></div>
        <div className="boxCube boxT6"></div>
        <div className="boxCube boxT7"></div>
      </div>
      <div className="box boxE">
        <div className="boxCube boxE1"></div>
        <div className="boxCube boxE2"></div>
        <div className="boxCube boxE3"></div>
        <div className="boxCube boxE4"></div>
        <div className="boxCube boxE5"></div>
        <div className="boxCube boxE6"></div>
        <div className="boxCube boxE7"></div>
        <div className="boxCube boxE8"></div>
        <div className="boxCube boxE9"></div>
        <div className="boxCube boxE10"></div>
        <div className="boxCube boxE11"></div>
        <div className="boxCube boxE12"></div>
        <div className="boxCube boxE13"></div>
      </div>
      <div className="boxs boxT">
        <div className="boxCube boxT1"></div>
        <div className="boxCube boxT2"></div>
        <div className="boxCube boxT3"></div>
        <div className="boxCube boxT4"></div>
        <div className="boxCube boxT5"></div>
        <div className="boxCube boxT6"></div>
        <div className="boxCube boxT7"></div>
      </div>
      <div className="box boxR">
        <div className="boxCube boxR1"></div>
        <div className="boxCube boxR2"></div>
        <div className="boxCube boxR3"></div>
        <div className="boxCube boxR4"></div>
        <div className="boxCube boxR5"></div>
        <div className="boxCube boxR6"></div>
        <div className="boxCube boxR7"></div>
        <div className="boxCube boxR8"></div>
        <div className="boxCube boxR9"></div>
        <div className="boxCube boxR10"></div>
        <div className="boxCube boxR11"></div>
        <div className="boxCube boxR12"></div>
        <div className="boxCube boxR13"></div>
        <div className="boxCube boxR14"></div>
      </div>
      <div className="boxs boxI">
        <div className="boxCube boxI1"></div>
        <div className="boxCube boxI2"></div>
        <div className="boxCube boxI3"></div>
        <div className="boxCube boxI4"></div>
        <div className="boxCube boxI5"></div>
        <div className="boxCube boxI6"></div>
        <div className="boxCube boxI7"></div>
        <div className="boxCube boxI8"></div>
        <div className="boxCube boxI9"></div>
      </div>
      <div className="box boxS">
        <div className="boxCube boxS1"></div>
        <div className="boxCube boxS2"></div>
        <div className="boxCube boxS3"></div>
        <div className="boxCube boxS4"></div>
        <div className="boxCube boxS5"></div>
        <div className="boxCube boxS6"></div>
        <div className="boxCube boxS7"></div>
        <div className="boxCube boxS8"></div>
        <div className="boxCube boxS9"></div>
        <div className="boxCube boxS10"></div>
        <div className="boxCube boxS11"></div>
        <div className="boxCube boxS12"></div>
        <div className="boxCube boxS13"></div>
        <div className="boxCube boxS14"></div>
      </div>
    </div>
  );
};

export default RedTetris;
