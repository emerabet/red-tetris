import React, { Component, useState, useEffect } from 'react';

import './style.css';

const PlayerLabel: React.SFC = () => {
    return (
        <div className="labelTitle">
            <div className="labelLetter">
                <div className="labelCube p1"></div>
                <div className="labelCube p2"></div>
                <div className="labelCube p3"></div>
                <div className="labelCube p4"></div>
                <div className="labelCube p5"></div>
                <div className="labelCube p6"></div>
                <div className="labelCube p7"></div>
                <div className="labelCube p8"></div>
                <div className="labelCube p9"></div>
                <div className="labelCube p10"></div>
                <div className="labelCube p11"></div>
                <div className="labelCube p12"></div>
                <div className="labelCube p13"></div>
                <div className="labelCube p14"></div>
            </div>
            <div className="labelLetter">
                <div className="labelCube l1"></div>
                <div className="labelCube l2"></div>
                <div className="labelCube l3"></div>
                <div className="labelCube l4"></div>
                <div className="labelCube l5"></div>
                <div className="labelCube l6"></div>
                <div className="labelCube l7"></div>
                <div className="labelCube l8"></div>
                <div className="labelCube l9"></div>
            </div>
            <div className="labelLetter">
                <div className="labelCube a1"></div>
                <div className="labelCube a2"></div>
                <div className="labelCube a3"></div>
                <div className="labelCube a4"></div>
                <div className="labelCube a5"></div>
                <div className="labelCube a6"></div>
                <div className="labelCube a7"></div>
                <div className="labelCube a8"></div>
                <div className="labelCube a9"></div>
                <div className="labelCube a10"></div>
                <div className="labelCube a11"></div>
                <div className="labelCube a12"></div>
                <div className="labelCube a13"></div>
                <div className="labelCube a14"></div>
                <div className="labelCube a15"></div>
                <div className="labelCube a16"></div>
                <div className="labelCube a17"></div>
                <div className="labelCube a18"></div>
            </div>
            <div className="labelLetter">
                <div className="labelCube y1"></div>
                <div className="labelCube y2"></div>
                <div className="labelCube y3"></div>
                <div className="labelCube y4"></div>
                <div className="labelCube y5"></div>
                <div className="labelCube y6"></div>
                <div className="labelCube y7"></div>
            </div>

            <div className="labelLetter">
                <div className="labelCube e1"></div>
                <div className="labelCube e2"></div>
                <div className="labelCube e3"></div>
                <div className="labelCube e4"></div>
                <div className="labelCube e5"></div>
                <div className="labelCube e6"></div>
                <div className="labelCube e7"></div>
                <div className="labelCube e8"></div>
                <div className="labelCube e9"></div>
                <div className="labelCube e10"></div>
                <div className="labelCube e11"></div>
                <div className="labelCube e12"></div>
                <div className="labelCube e13"></div>
                <div className="labelCube e14"></div>
                <div className="labelCube e15"></div>
                <div className="labelCube e16"></div>
            </div>
            <div className="labelLetter">
                <div className="labelCube r1"></div>
                <div className="labelCube r2"></div>
                <div className="labelCube r3"></div>
                <div className="labelCube r4"></div>
                <div className="labelCube r5"></div>
                <div className="labelCube r6"></div>
                <div className="labelCube r7"></div>
                <div className="labelCube r8"></div>
                <div className="labelCube r9"></div>
                <div className="labelCube r10"></div>
                <div className="labelCube r11"></div>
                <div className="labelCube r12"></div>
                <div className="labelCube r13"></div>
                <div className="labelCube r14"></div>
                <div className="labelCube r15"></div>
                <div className="labelCube r16"></div>
            </div>
        </div>
    )
}

export default PlayerLabel;
