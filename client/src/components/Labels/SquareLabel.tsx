import React, { Component, useState, useEffect } from 'react';

import './style.css';

const alphabet = {
    a: () => <div className="labelLetterM">
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
    </div>,
    b: () => <div className="labelLetterM">
        <div className="labelCube b1"></div>
        <div className="labelCube b2"></div>
        <div className="labelCube b3"></div>
        <div className="labelCube b4"></div>
        <div className="labelCube b5"></div>
        <div className="labelCube b6"></div>
        <div className="labelCube b7"></div>
        <div className="labelCube b8"></div>
        <div className="labelCube b9"></div>
        <div className="labelCube b10"></div>
        <div className="labelCube b11"></div>
        <div className="labelCube b12"></div>
        <div className="labelCube b13"></div>
    </div>,
    c: () => <div className="labelLetterM">
        <div className="labelCube c1"></div>
        <div className="labelCube c2"></div>
        <div className="labelCube c3"></div>
        <div className="labelCube c4"></div>
        <div className="labelCube c5"></div>
        <div className="labelCube c6"></div>
        <div className="labelCube c7"></div>
        <div className="labelCube c8"></div>
        <div className="labelCube c9"></div>
    </div>,
    d: () => <div className="labelLetterM">
        <div className="labelCube d1"></div>
        <div className="labelCube d2"></div>
        <div className="labelCube d3"></div>
        <div className="labelCube d4"></div>
        <div className="labelCube d5"></div>
        <div className="labelCube d6"></div>
        <div className="labelCube d7"></div>
        <div className="labelCube d8"></div>
        <div className="labelCube d9"></div>
        <div className="labelCube d10"></div>
        <div className="labelCube d11"></div>
        <div className="labelCube d12"></div>
    </div>,
    e: () => <div className="labelLetterM">
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
    </div>,
    f: () => <div className="labelLetterM">
        <div className="labelCube f1"></div>
        <div className="labelCube f2"></div>
        <div className="labelCube f3"></div>
        <div className="labelCube f4"></div>
        <div className="labelCube f5"></div>
        <div className="labelCube f6"></div>
        <div className="labelCube f7"></div>
        <div className="labelCube f8"></div>
        <div className="labelCube f9"></div>
        <div className="labelCube f10"></div>
    </div>,
    g: () => <div className="labelLetterM">
        <div className="labelCube g1"></div>
        <div className="labelCube g2"></div>
        <div className="labelCube g3"></div>
        <div className="labelCube g4"></div>
        <div className="labelCube g5"></div>
        <div className="labelCube g6"></div>
        <div className="labelCube g7"></div>
        <div className="labelCube g8"></div>
        <div className="labelCube g9"></div>
        <div className="labelCube g10"></div>
        <div className="labelCube g11"></div>
        <div className="labelCube g12"></div>
    </div>,
    h: () => <div className="labelLetterM">
        <div className="labelCube h1"></div>
        <div className="labelCube h2"></div>
        <div className="labelCube h3"></div>
        <div className="labelCube h4"></div>
        <div className="labelCube h5"></div>
        <div className="labelCube h6"></div>
        <div className="labelCube h7"></div>
        <div className="labelCube h8"></div>
        <div className="labelCube h9"></div>
        <div className="labelCube h10"></div>
        <div className="labelCube h11"></div>
        <div className="labelCube h12"></div>
    </div>,
    i: () => <div className="labelLetterS">
        <div className="labelCube i1"></div>
        <div className="labelCube i2"></div>
        <div className="labelCube i3"></div>
        <div className="labelCube i4"></div>
        <div className="labelCube i5"></div>
        <div className="labelCube i6"></div>
        <div className="labelCube i7"></div>
        <div className="labelCube i8"></div>
        <div className="labelCube i9"></div>
    </div>,
    j: () => <div className="labelLetter">
        <div className="labelCube j1"></div>
        <div className="labelCube j2"></div>
        <div className="labelCube j3"></div>
        <div className="labelCube j4"></div>
        <div className="labelCube j5"></div>
        <div className="labelCube j6"></div>
        <div className="labelCube j7"></div>
        <div className="labelCube j8"></div>
        <div className="labelCube j9"></div>
        <div className="labelCube j10"></div>
        <div className="labelCube j11"></div>
    </div>,
    k: () => <div className="labelLetterM">
        <div className="labelCube k1"></div>
        <div className="labelCube k2"></div>
        <div className="labelCube k3"></div>
        <div className="labelCube k4"></div>
        <div className="labelCube k5"></div>
        <div className="labelCube k6"></div>
        <div className="labelCube k7"></div>
        <div className="labelCube k8"></div>
        <div className="labelCube k9"></div>
        <div className="labelCube k10"></div>
    </div>,
    l: () => <div className="labelLetterM">
        <div className="labelCube l1"></div>
        <div className="labelCube l2"></div>
        <div className="labelCube l3"></div>
        <div className="labelCube l4"></div>
        <div className="labelCube l5"></div>
        <div className="labelCube l6"></div>
        <div className="labelCube l7"></div>
        <div className="labelCube l8"></div>
    </div>,
    m: () => <div className="labelLetter">
        <div className="labelCube m1"></div>
        <div className="labelCube m2"></div>
        <div className="labelCube m3"></div>
        <div className="labelCube m4"></div>
        <div className="labelCube m5"></div>
        <div className="labelCube m6"></div>
        <div className="labelCube m7"></div>
        <div className="labelCube m8"></div>
        <div className="labelCube m9"></div>
        <div className="labelCube m10"></div>
        <div className="labelCube m11"></div>
        <div className="labelCube m12"></div>
        <div className="labelCube m13"></div>
    </div>,
    n: () => <div className="labelLetterM">
        <div className="labelCube n1"></div>
        <div className="labelCube n2"></div>
        <div className="labelCube n3"></div>
        <div className="labelCube n4"></div>
        <div className="labelCube n5"></div>
        <div className="labelCube n6"></div>
        <div className="labelCube n7"></div>
        <div className="labelCube n8"></div>
        <div className="labelCube n9"></div>
        <div className="labelCube n10"></div>
        <div className="labelCube n11"></div>
        <div className="labelCube n12"></div>
    </div>,
    o: () => <div className="labelLetterM">
        <div className="labelCube o1"></div>
        <div className="labelCube o2"></div>
        <div className="labelCube o3"></div>
        <div className="labelCube o4"></div>
        <div className="labelCube o5"></div>
        <div className="labelCube o6"></div>
        <div className="labelCube o7"></div>
        <div className="labelCube o8"></div>
        <div className="labelCube o9"></div>
        <div className="labelCube o10"></div>
        <div className="labelCube o11"></div>
    </div>,
    p: () => <div className="labelLetterM">
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
    </div>,
    q: () => <div className="labelLetter">
        <div className="labelCube q1"></div>
        <div className="labelCube q2"></div>
        <div className="labelCube q3"></div>
        <div className="labelCube q4"></div>
        <div className="labelCube q5"></div>
        <div className="labelCube q6"></div>
        <div className="labelCube q7"></div>
        <div className="labelCube q8"></div>
        <div className="labelCube q9"></div>
        <div className="labelCube q10"></div>
        <div className="labelCube q11"></div>
        <div className="labelCube q12"></div>
    </div>,
    r: () => <div className="labelLetterM">
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
    </div>,
    s: () => <div className="labelLetterM">
        <div className="labelCube s1"></div>
        <div className="labelCube s2"></div>
        <div className="labelCube s3"></div>
        <div className="labelCube s4"></div>
        <div className="labelCube s5"></div>
        <div className="labelCube s6"></div>
        <div className="labelCube s7"></div>
        <div className="labelCube s8"></div>
        <div className="labelCube s9"></div>
        <div className="labelCube s10"></div>
    </div>,
    t: () => <div className="labelLetter">
        <div className="labelCube t1"></div>
        <div className="labelCube t2"></div>
        <div className="labelCube t3"></div>
        <div className="labelCube t4"></div>
        <div className="labelCube t5"></div>
        <div className="labelCube t6"></div>
        <div className="labelCube t7"></div>
        <div className="labelCube t8"></div>
        <div className="labelCube t9"></div>
    </div>,
    u: () => <div className="labelLetterM">
        <div className="labelCube u1"></div>
        <div className="labelCube u2"></div>
        <div className="labelCube u3"></div>
        <div className="labelCube u4"></div>
        <div className="labelCube u5"></div>
        <div className="labelCube u6"></div>
        <div className="labelCube u7"></div>
        <div className="labelCube u8"></div>
        <div className="labelCube u9"></div>
        <div className="labelCube u10"></div>
    </div>,
    v: () => <div className="labelLetterM">
        <div className="labelCube v1"></div>
        <div className="labelCube v2"></div>
        <div className="labelCube v3"></div>
        <div className="labelCube v4"></div>
        <div className="labelCube v5"></div>
        <div className="labelCube v6"></div>
        <div className="labelCube v7"></div>
        <div className="labelCube v8"></div>
        <div className="labelCube v9"></div>
    </div>,
    w: () => <div className="labelLetter">
        <div className="labelCube w1"></div>
        <div className="labelCube w2"></div>
        <div className="labelCube w3"></div>
        <div className="labelCube w4"></div>
        <div className="labelCube w5"></div>
        <div className="labelCube w6"></div>
        <div className="labelCube w7"></div>
        <div className="labelCube w8"></div>
        <div className="labelCube w9"></div>
        <div className="labelCube w10"></div>
        <div className="labelCube w11"></div>
        <div className="labelCube w12"></div>
        <div className="labelCube w13"></div>
        <div className="labelCube w14"></div>
    </div>,
    x: () => <div className="labelLetterM">
        <div className="labelCube x1"></div>
        <div className="labelCube x2"></div>
        <div className="labelCube x3"></div>
        <div className="labelCube x4"></div>
        <div className="labelCube x5"></div>
        <div className="labelCube x6"></div>
        <div className="labelCube x7"></div>
        <div className="labelCube x8"></div>
        <div className="labelCube x9"></div>
        <div className="labelCube x10"></div>
        <div className="labelCube x11"></div>
    </div>,
    y: () => <div className="labelLetterM">
        <div className="labelCube y1"></div>
        <div className="labelCube y2"></div>
        <div className="labelCube y3"></div>
        <div className="labelCube y4"></div>
        <div className="labelCube y5"></div>
        <div className="labelCube y6"></div>
        <div className="labelCube y7"></div>
        <div className="labelCube y8"></div>
        <div className="labelCube y9"></div>
        <div className="labelCube y10"></div>
    </div>,
    z: () => <div className="labelLetterM">
        <div className="labelCube z1"></div>
        <div className="labelCube z2"></div>
        <div className="labelCube z3"></div>
        <div className="labelCube z4"></div>
        <div className="labelCube z5"></div>
        <div className="labelCube z6"></div>
        <div className="labelCube z7"></div>
        <div className="labelCube z8"></div>
        <div className="labelCube z9"></div>
        <div className="labelCube z10"></div>
        <div className="labelCube z11"></div>
        <div className="labelCube z12"></div>
    </div>,
}

interface SquareLabelInterface {
    label: any;
}

const PlayerLabel: React.SFC<SquareLabelInterface> = (props) => {

    return (
        <div className="labelTitle">
            {
                [...props.label].map((c) => {
                    return alphabet[c]();
                })
            }
        </div>
    )
}

export default PlayerLabel;
