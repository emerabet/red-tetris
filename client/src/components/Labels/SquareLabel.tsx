import React, { Component, useState, useEffect } from 'react';

import './style.css';

interface AlphabetInterface {
  a: JSX.Element;
  b: JSX.Element;
  c: JSX.Element;
  d: JSX.Element;
  e: JSX.Element;
  f: JSX.Element;
  g: JSX.Element;
  h: JSX.Element;
  i: JSX.Element;
  j: JSX.Element;
  k: JSX.Element;
  l: JSX.Element;
  m: JSX.Element;
  n: JSX.Element;
  o: JSX.Element;
  p: JSX.Element;
  q: JSX.Element;
  r: JSX.Element;
  s: JSX.Element;
  t: JSX.Element;
  u: JSX.Element;
  v: JSX.Element;
  w: JSX.Element;
  x: JSX.Element;
  y: JSX.Element;
  z: JSX.Element;
  1: JSX.Element;
  2: JSX.Element;
  3: JSX.Element;
  4: JSX.Element;
  5: JSX.Element;
  6: JSX.Element;
  7: JSX.Element;
  8: JSX.Element;
  9: JSX.Element;
  [key: string]: JSX.Element;
}

const alphabet: AlphabetInterface = {
  a: <div className="labelLetterM">
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
  b: <div className="labelLetterM">
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
  c: <div className="labelLetterM">
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
  d: <div className="labelLetterM">
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
  e: <div className="labelLetterM">
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
  f: <div className="labelLetterM">
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
  g: <div className="labelLetterM">
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
  h: <div className="labelLetterM">
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
  i: <div className="labelLetterS">
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
  j: <div className="labelLetter">
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
  k: <div className="labelLetterM">
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
  l: <div className="labelLetterM">
    <div className="labelCube l1"></div>
    <div className="labelCube l2"></div>
    <div className="labelCube l3"></div>
    <div className="labelCube l4"></div>
    <div className="labelCube l5"></div>
    <div className="labelCube l6"></div>
    <div className="labelCube l7"></div>
    <div className="labelCube l8"></div>
  </div>,
  m: <div className="labelLetter">
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
  n: <div className="labelLetterM">
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
  o: <div className="labelLetterM">
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
  p: <div className="labelLetterM">
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
  q: <div className="labelLetter">
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
  r: <div className="labelLetterM">
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
  s: <div className="labelLetterM">
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
  t: <div className="labelLetter">
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
  u: <div className="labelLetterM">
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
  v: <div className="labelLetterM">
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
  w: <div className="labelLetter">
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
  x: <div className="labelLetterM">
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
  y: <div className="labelLetterM">
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
  z: <div className="labelLetterM">
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
  1: <div className="labelLetterS">
    <div className="labelCube num1-1"></div>
    <div className="labelCube num1-2"></div>
    <div className="labelCube num1-3"></div>
    <div className="labelCube num1-4"></div>
    <div className="labelCube num1-5"></div>
    <div className="labelCube num1-6"></div>
    <div className="labelCube num1-7"></div>
  </div>,
  2: <div className="labelLetterM">
    <div className="labelCube num2-1"></div>
    <div className="labelCube num2-2"></div>
    <div className="labelCube num2-3"></div>
    <div className="labelCube num2-4"></div>
    <div className="labelCube num2-5"></div>
    <div className="labelCube num2-6"></div>
    <div className="labelCube num2-7"></div>
    <div className="labelCube num2-8"></div>
    <div className="labelCube num2-9"></div>
    <div className="labelCube num2-10"></div>
    <div className="labelCube num2-11"></div>
  </div>,
  3: <div className="labelLetterM">
    <div className="labelCube num3-1"></div>
    <div className="labelCube num3-2"></div>
    <div className="labelCube num3-3"></div>
    <div className="labelCube num3-4"></div>
    <div className="labelCube num3-5"></div>
    <div className="labelCube num3-6"></div>
    <div className="labelCube num3-7"></div>
    <div className="labelCube num3-8"></div>
    <div className="labelCube num3-9"></div>
    <div className="labelCube num3-10"></div>
  </div>,
  4: <div className="labelLetterM">
    <div className="labelCube num4-1"></div>
    <div className="labelCube num4-2"></div>
    <div className="labelCube num4-3"></div>
    <div className="labelCube num4-4"></div>
    <div className="labelCube num4-5"></div>
    <div className="labelCube num4-6"></div>
    <div className="labelCube num4-7"></div>
    <div className="labelCube num4-8"></div>
    <div className="labelCube num4-9"></div>
  </div>,
  5: <div className="labelLetterM">
    <div className="labelCube num5-1"></div>
    <div className="labelCube num5-2"></div>
    <div className="labelCube num5-3"></div>
    <div className="labelCube num5-4"></div>
    <div className="labelCube num5-5"></div>
    <div className="labelCube num5-6"></div>
    <div className="labelCube num5-7"></div>
    <div className="labelCube num5-8"></div>
    <div className="labelCube num5-9"></div>
    <div className="labelCube num5-10"></div>
    <div className="labelCube num5-11"></div>
    <div className="labelCube num5-12"></div>
    <div className="labelCube num5-13"></div>
  </div>,
  6: <div className="labelLetterM">
    <div className="labelCube num6-1"></div>
    <div className="labelCube num6-2"></div>
    <div className="labelCube num6-3"></div>
    <div className="labelCube num6-4"></div>
    <div className="labelCube num6-5"></div>
    <div className="labelCube num6-6"></div>
    <div className="labelCube num6-7"></div>
    <div className="labelCube num6-8"></div>
    <div className="labelCube num6-9"></div>
    <div className="labelCube num6-10"></div>
    <div className="labelCube num6-11"></div>
    <div className="labelCube num6-12"></div>
  </div>,
  7: <div className="labelLetterM">
    <div className="labelCube num7-1"></div>
    <div className="labelCube num7-2"></div>
    <div className="labelCube num7-3"></div>
    <div className="labelCube num7-4"></div>
    <div className="labelCube num7-5"></div>
    <div className="labelCube num7-6"></div>
    <div className="labelCube num7-7"></div>
    <div className="labelCube num7-8"></div>
  </div>,
  8: <div className="labelLetterM">
    <div className="labelCube num8-1"></div>
    <div className="labelCube num8-2"></div>
    <div className="labelCube num8-3"></div>
    <div className="labelCube num8-4"></div>
    <div className="labelCube num8-5"></div>
    <div className="labelCube num8-6"></div>
    <div className="labelCube num8-7"></div>
    <div className="labelCube num8-8"></div>
    <div className="labelCube num8-9"></div>
    <div className="labelCube num8-10"></div>
  </div>,
  9: <div className="labelLetterM">
    <div className="labelCube num9-1"></div>
    <div className="labelCube num9-2"></div>
    <div className="labelCube num9-3"></div>
    <div className="labelCube num9-4"></div>
    <div className="labelCube num9-5"></div>
    <div className="labelCube num9-6"></div>
    <div className="labelCube num9-7"></div>
    <div className="labelCube num9-8"></div>
    <div className="labelCube num9-9"></div>
    <div className="labelCube num9-10"></div>
    <div className="labelCube num9-11"></div>
    <div className="labelCube num9-12"></div>
    <div className="labelCube num9-13"></div>
  </div>,
  ':': <div className="labelLetterS">
    <div className="labelCube dot-1"></div>
    <div className="labelCube dot-2"></div>
  </div>,
  ' ': <div className="labelLetterS">
  </div>,
};

const redAlphabet: AlphabetInterface = {
  a: <div className="labelLetterM">
    <div className="labelCube redCube a1"></div>
    <div className="labelCube redCube a2"></div>
    <div className="labelCube redCube a3"></div>
    <div className="labelCube redCube a4"></div>
    <div className="labelCube redCube a5"></div>
    <div className="labelCube redCube a6"></div>
    <div className="labelCube redCube a7"></div>
    <div className="labelCube redCube a8"></div>
    <div className="labelCube redCube a9"></div>
    <div className="labelCube redCube a10"></div>
    <div className="labelCube redCube a11"></div>
    <div className="labelCube redCube a12"></div>
    <div className="labelCube redCube a13"></div>
  </div>,
  b: <div className="labelLetterM">
    <div className="labelCube redCube b1"></div>
    <div className="labelCube redCube b2"></div>
    <div className="labelCube redCube b3"></div>
    <div className="labelCube redCube b4"></div>
    <div className="labelCube redCube b5"></div>
    <div className="labelCube redCube b6"></div>
    <div className="labelCube redCube b7"></div>
    <div className="labelCube redCube b8"></div>
    <div className="labelCube redCube b9"></div>
    <div className="labelCube redCube b10"></div>
    <div className="labelCube redCube b11"></div>
    <div className="labelCube redCube b12"></div>
    <div className="labelCube redCube b13"></div>
  </div>,
  c: <div className="labelLetterM">
    <div className="labelCube redCube c1"></div>
    <div className="labelCube redCube c2"></div>
    <div className="labelCube redCube c3"></div>
    <div className="labelCube redCube c4"></div>
    <div className="labelCube redCube c5"></div>
    <div className="labelCube redCube c6"></div>
    <div className="labelCube redCube c7"></div>
    <div className="labelCube redCube c8"></div>
    <div className="labelCube redCube c9"></div>
  </div>,
  d: <div className="labelLetterM">
    <div className="labelCube redCube d1"></div>
    <div className="labelCube redCube d2"></div>
    <div className="labelCube redCube d3"></div>
    <div className="labelCube redCube d4"></div>
    <div className="labelCube redCube d5"></div>
    <div className="labelCube redCube d6"></div>
    <div className="labelCube redCube d7"></div>
    <div className="labelCube redCube d8"></div>
    <div className="labelCube redCube d9"></div>
    <div className="labelCube redCube d10"></div>
    <div className="labelCube redCube d11"></div>
    <div className="labelCube redCube d12"></div>
  </div>,
  e: <div className="labelLetterM">
    <div className="labelCube redCube e1"></div>
    <div className="labelCube redCube e2"></div>
    <div className="labelCube redCube e3"></div>
    <div className="labelCube redCube e4"></div>
    <div className="labelCube redCube e5"></div>
    <div className="labelCube redCube e6"></div>
    <div className="labelCube redCube e7"></div>
    <div className="labelCube redCube e8"></div>
    <div className="labelCube redCube e9"></div>
    <div className="labelCube redCube e10"></div>
    <div className="labelCube redCube e11"></div>
    <div className="labelCube redCube e12"></div>
    <div className="labelCube redCube e13"></div>
  </div>,
  f: <div className="labelLetterM">
    <div className="labelCube redCube f1"></div>
    <div className="labelCube redCube f2"></div>
    <div className="labelCube redCube f3"></div>
    <div className="labelCube redCube f4"></div>
    <div className="labelCube redCube f5"></div>
    <div className="labelCube redCube f6"></div>
    <div className="labelCube redCube f7"></div>
    <div className="labelCube redCube f8"></div>
    <div className="labelCube redCube f9"></div>
    <div className="labelCube redCube f10"></div>
  </div>,
  g: <div className="labelLetterM">
    <div className="labelCube redCube g1"></div>
    <div className="labelCube redCube g2"></div>
    <div className="labelCube redCube g3"></div>
    <div className="labelCube redCube g4"></div>
    <div className="labelCube redCube g5"></div>
    <div className="labelCube redCube g6"></div>
    <div className="labelCube redCube g7"></div>
    <div className="labelCube redCube g8"></div>
    <div className="labelCube redCube g9"></div>
    <div className="labelCube redCube g10"></div>
    <div className="labelCube redCube g11"></div>
    <div className="labelCube redCube g12"></div>
  </div>,
  h: <div className="labelLetterM">
    <div className="labelCube redCube h1"></div>
    <div className="labelCube redCube h2"></div>
    <div className="labelCube redCube h3"></div>
    <div className="labelCube redCube h4"></div>
    <div className="labelCube redCube h5"></div>
    <div className="labelCube redCube h6"></div>
    <div className="labelCube redCube h7"></div>
    <div className="labelCube redCube h8"></div>
    <div className="labelCube redCube h9"></div>
    <div className="labelCube redCube h10"></div>
    <div className="labelCube redCube h11"></div>
    <div className="labelCube redCube h12"></div>
  </div>,
  i: <div className="labelLetterS">
    <div className="labelCube redCube i1"></div>
    <div className="labelCube redCube i2"></div>
    <div className="labelCube redCube i3"></div>
    <div className="labelCube redCube i4"></div>
    <div className="labelCube redCube i5"></div>
    <div className="labelCube redCube i6"></div>
    <div className="labelCube redCube i7"></div>
    <div className="labelCube redCube i8"></div>
    <div className="labelCube redCube i9"></div>
  </div>,
  j: <div className="labelLetter">
    <div className="labelCube redCube j1"></div>
    <div className="labelCube redCube j2"></div>
    <div className="labelCube redCube j3"></div>
    <div className="labelCube redCube j4"></div>
    <div className="labelCube redCube j5"></div>
    <div className="labelCube redCube j6"></div>
    <div className="labelCube redCube j7"></div>
    <div className="labelCube redCube j8"></div>
    <div className="labelCube redCube j9"></div>
    <div className="labelCube redCube j10"></div>
    <div className="labelCube redCube j11"></div>
  </div>,
  k: <div className="labelLetterM">
    <div className="labelCube redCube k1"></div>
    <div className="labelCube redCube k2"></div>
    <div className="labelCube redCube k3"></div>
    <div className="labelCube redCube k4"></div>
    <div className="labelCube redCube k5"></div>
    <div className="labelCube redCube k6"></div>
    <div className="labelCube redCube k7"></div>
    <div className="labelCube redCube k8"></div>
    <div className="labelCube redCube k9"></div>
    <div className="labelCube redCube k10"></div>
  </div>,
  l: <div className="labelLetterM">
    <div className="labelCube redCube l1"></div>
    <div className="labelCube redCube l2"></div>
    <div className="labelCube redCube l3"></div>
    <div className="labelCube redCube l4"></div>
    <div className="labelCube redCube l5"></div>
    <div className="labelCube redCube l6"></div>
    <div className="labelCube redCube l7"></div>
    <div className="labelCube redCube l8"></div>
  </div>,
  m: <div className="labelLetter">
    <div className="labelCube redCube m1"></div>
    <div className="labelCube redCube m2"></div>
    <div className="labelCube redCube m3"></div>
    <div className="labelCube redCube m4"></div>
    <div className="labelCube redCube m5"></div>
    <div className="labelCube redCube m6"></div>
    <div className="labelCube redCube m7"></div>
    <div className="labelCube redCube m8"></div>
    <div className="labelCube redCube m9"></div>
    <div className="labelCube redCube m10"></div>
    <div className="labelCube redCube m11"></div>
    <div className="labelCube redCube m12"></div>
    <div className="labelCube redCube m13"></div>
  </div>,
  n: <div className="labelLetterM">
    <div className="labelCube redCube n1"></div>
    <div className="labelCube redCube n2"></div>
    <div className="labelCube redCube n3"></div>
    <div className="labelCube redCube n4"></div>
    <div className="labelCube redCube n5"></div>
    <div className="labelCube redCube n6"></div>
    <div className="labelCube redCube n7"></div>
    <div className="labelCube redCube n8"></div>
    <div className="labelCube redCube n9"></div>
    <div className="labelCube redCube n10"></div>
    <div className="labelCube redCube n11"></div>
    <div className="labelCube redCube n12"></div>
  </div>,
  o: <div className="labelLetterM">
    <div className="labelCube redCube o1"></div>
    <div className="labelCube redCube o2"></div>
    <div className="labelCube redCube o3"></div>
    <div className="labelCube redCube o4"></div>
    <div className="labelCube redCube o5"></div>
    <div className="labelCube redCube o6"></div>
    <div className="labelCube redCube o7"></div>
    <div className="labelCube redCube o8"></div>
    <div className="labelCube redCube o9"></div>
    <div className="labelCube redCube o10"></div>
    <div className="labelCube redCube o11"></div>
  </div>,
  p: <div className="labelLetterM">
    <div className="labelCube redCube p1"></div>
    <div className="labelCube redCube p2"></div>
    <div className="labelCube redCube p3"></div>
    <div className="labelCube redCube p4"></div>
    <div className="labelCube redCube p5"></div>
    <div className="labelCube redCube p6"></div>
    <div className="labelCube redCube p7"></div>
    <div className="labelCube redCube p8"></div>
    <div className="labelCube redCube p9"></div>
    <div className="labelCube redCube p10"></div>
    <div className="labelCube redCube p11"></div>
  </div>,
  q: <div className="labelLetter">
    <div className="labelCube redCube q1"></div>
    <div className="labelCube redCube q2"></div>
    <div className="labelCube redCube q3"></div>
    <div className="labelCube redCube q4"></div>
    <div className="labelCube redCube q5"></div>
    <div className="labelCube redCube q6"></div>
    <div className="labelCube redCube q7"></div>
    <div className="labelCube redCube q8"></div>
    <div className="labelCube redCube q9"></div>
    <div className="labelCube redCube q10"></div>
    <div className="labelCube redCube q11"></div>
    <div className="labelCube redCube q12"></div>
  </div>,
  r: <div className="labelLetterM">
    <div className="labelCube redCube r1"></div>
    <div className="labelCube redCube r2"></div>
    <div className="labelCube redCube r3"></div>
    <div className="labelCube redCube r4"></div>
    <div className="labelCube redCube r5"></div>
    <div className="labelCube redCube r6"></div>
    <div className="labelCube redCube r7"></div>
    <div className="labelCube redCube r8"></div>
    <div className="labelCube redCube r9"></div>
    <div className="labelCube redCube r10"></div>
    <div className="labelCube redCube r11"></div>
    <div className="labelCube redCube r12"></div>
  </div>,
  s: <div className="labelLetterM">
    <div className="labelCube redCube s1"></div>
    <div className="labelCube redCube s2"></div>
    <div className="labelCube redCube s3"></div>
    <div className="labelCube redCube s4"></div>
    <div className="labelCube redCube s5"></div>
    <div className="labelCube redCube s6"></div>
    <div className="labelCube redCube s7"></div>
    <div className="labelCube redCube s8"></div>
    <div className="labelCube redCube s9"></div>
    <div className="labelCube redCube s10"></div>
  </div>,
  t: <div className="labelLetter">
    <div className="labelCube redCube t1"></div>
    <div className="labelCube redCube t2"></div>
    <div className="labelCube redCube t3"></div>
    <div className="labelCube redCube t4"></div>
    <div className="labelCube redCube t5"></div>
    <div className="labelCube redCube t6"></div>
    <div className="labelCube redCube t7"></div>
    <div className="labelCube redCube t8"></div>
    <div className="labelCube redCube t9"></div>
  </div>,
  u: <div className="labelLetterM">
    <div className="labelCube redCube u1"></div>
    <div className="labelCube redCube u2"></div>
    <div className="labelCube redCube u3"></div>
    <div className="labelCube redCube u4"></div>
    <div className="labelCube redCube u5"></div>
    <div className="labelCube redCube u6"></div>
    <div className="labelCube redCube u7"></div>
    <div className="labelCube redCube u8"></div>
    <div className="labelCube redCube u9"></div>
    <div className="labelCube redCube u10"></div>
  </div>,
  v: <div className="labelLetterM">
    <div className="labelCube redCube v1"></div>
    <div className="labelCube redCube v2"></div>
    <div className="labelCube redCube v3"></div>
    <div className="labelCube redCube v4"></div>
    <div className="labelCube redCube v5"></div>
    <div className="labelCube redCube v6"></div>
    <div className="labelCube redCube v7"></div>
    <div className="labelCube redCube v8"></div>
    <div className="labelCube redCube v9"></div>
  </div>,
  w: <div className="labelLetter">
    <div className="labelCube redCube w1"></div>
    <div className="labelCube redCube w2"></div>
    <div className="labelCube redCube w3"></div>
    <div className="labelCube redCube w4"></div>
    <div className="labelCube redCube w5"></div>
    <div className="labelCube redCube w6"></div>
    <div className="labelCube redCube w7"></div>
    <div className="labelCube redCube w8"></div>
    <div className="labelCube redCube w9"></div>
    <div className="labelCube redCube w10"></div>
    <div className="labelCube redCube w11"></div>
    <div className="labelCube redCube w12"></div>
    <div className="labelCube redCube w13"></div>
    <div className="labelCube redCube w14"></div>
  </div>,
  x: <div className="labelLetterM">
    <div className="labelCube redCube x1"></div>
    <div className="labelCube redCube x2"></div>
    <div className="labelCube redCube x3"></div>
    <div className="labelCube redCube x4"></div>
    <div className="labelCube redCube x5"></div>
    <div className="labelCube redCube x6"></div>
    <div className="labelCube redCube x7"></div>
    <div className="labelCube redCube x8"></div>
    <div className="labelCube redCube x9"></div>
    <div className="labelCube redCube x10"></div>
    <div className="labelCube redCube x11"></div>
  </div>,
  y: <div className="labelLetterM">
    <div className="labelCube redCube y1"></div>
    <div className="labelCube redCube y2"></div>
    <div className="labelCube redCube y3"></div>
    <div className="labelCube redCube y4"></div>
    <div className="labelCube redCube y5"></div>
    <div className="labelCube redCube y6"></div>
    <div className="labelCube redCube y7"></div>
    <div className="labelCube redCube y8"></div>
    <div className="labelCube redCube y9"></div>
    <div className="labelCube redCube y10"></div>
  </div>,
  z: <div className="labelLetterM">
    <div className="labelCube redCube z1"></div>
    <div className="labelCube redCube z2"></div>
    <div className="labelCube redCube z3"></div>
    <div className="labelCube redCube z4"></div>
    <div className="labelCube redCube z5"></div>
    <div className="labelCube redCube z6"></div>
    <div className="labelCube redCube z7"></div>
    <div className="labelCube redCube z8"></div>
    <div className="labelCube redCube z9"></div>
    <div className="labelCube redCube z10"></div>
    <div className="labelCube redCube z11"></div>
    <div className="labelCube redCube z12"></div>
  </div>,
  1: <div className="labelLetterS">
    <div className="labelCube redCube num1-1"></div>
    <div className="labelCube redCube num1-2"></div>
    <div className="labelCube redCube num1-3"></div>
    <div className="labelCube redCube num1-4"></div>
    <div className="labelCube redCube num1-5"></div>
    <div className="labelCube redCube num1-6"></div>
    <div className="labelCube redCube num1-7"></div>
  </div>,
  2: <div className="labelLetterM">
    <div className="labelCube redCube num2-1"></div>
    <div className="labelCube redCube num2-2"></div>
    <div className="labelCube redCube num2-3"></div>
    <div className="labelCube redCube num2-4"></div>
    <div className="labelCube redCube num2-5"></div>
    <div className="labelCube redCube num2-6"></div>
    <div className="labelCube redCube num2-7"></div>
    <div className="labelCube redCube num2-8"></div>
    <div className="labelCube redCube num2-9"></div>
    <div className="labelCube redCube num2-10"></div>
    <div className="labelCube redCube num2-11"></div>
  </div>,
  3: <div className="labelLetterM">
    <div className="labelCube redCube num3-1"></div>
    <div className="labelCube redCube num3-2"></div>
    <div className="labelCube redCube num3-3"></div>
    <div className="labelCube redCube num3-4"></div>
    <div className="labelCube redCube num3-5"></div>
    <div className="labelCube redCube num3-6"></div>
    <div className="labelCube redCube num3-7"></div>
    <div className="labelCube redCube num3-8"></div>
    <div className="labelCube redCube num3-9"></div>
    <div className="labelCube redCube num3-10"></div>
  </div>,
  4: <div className="labelLetterM">
    <div className="labelCube redCube num4-1"></div>
    <div className="labelCube redCube num4-2"></div>
    <div className="labelCube redCube num4-3"></div>
    <div className="labelCube redCube num4-4"></div>
    <div className="labelCube redCube num4-5"></div>
    <div className="labelCube redCube num4-6"></div>
    <div className="labelCube redCube num4-7"></div>
    <div className="labelCube redCube num4-8"></div>
    <div className="labelCube redCube num4-9"></div>
  </div>,
  5: <div className="labelLetterM">
    <div className="labelCube redCube num5-1"></div>
    <div className="labelCube redCube num5-2"></div>
    <div className="labelCube redCube num5-3"></div>
    <div className="labelCube redCube num5-4"></div>
    <div className="labelCube redCube num5-5"></div>
    <div className="labelCube redCube num5-6"></div>
    <div className="labelCube redCube num5-7"></div>
    <div className="labelCube redCube num5-8"></div>
    <div className="labelCube redCube num5-9"></div>
    <div className="labelCube redCube num5-10"></div>
    <div className="labelCube redCube num5-11"></div>
    <div className="labelCube redCube num5-12"></div>
    <div className="labelCube redCube num5-13"></div>
  </div>,
  6: <div className="labelLetterM">
    <div className="labelCube redCube num6-1"></div>
    <div className="labelCube redCube num6-2"></div>
    <div className="labelCube redCube num6-3"></div>
    <div className="labelCube redCube num6-4"></div>
    <div className="labelCube redCube num6-5"></div>
    <div className="labelCube redCube num6-6"></div>
    <div className="labelCube redCube num6-7"></div>
    <div className="labelCube redCube num6-8"></div>
    <div className="labelCube redCube num6-9"></div>
    <div className="labelCube redCube num6-10"></div>
    <div className="labelCube redCube num6-11"></div>
    <div className="labelCube redCube num6-12"></div>
  </div>,
  7: <div className="labelLetterM">
    <div className="labelCube redCube num7-1"></div>
    <div className="labelCube redCube num7-2"></div>
    <div className="labelCube redCube num7-3"></div>
    <div className="labelCube redCube num7-4"></div>
    <div className="labelCube redCube num7-5"></div>
    <div className="labelCube redCube num7-6"></div>
    <div className="labelCube redCube num7-7"></div>
    <div className="labelCube redCube num7-8"></div>
  </div>,
  8: <div className="labelLetterM">
    <div className="labelCube redCube num8-1"></div>
    <div className="labelCube redCube num8-2"></div>
    <div className="labelCube redCube num8-3"></div>
    <div className="labelCube redCube num8-4"></div>
    <div className="labelCube redCube num8-5"></div>
    <div className="labelCube redCube num8-6"></div>
    <div className="labelCube redCube num8-7"></div>
    <div className="labelCube redCube num8-8"></div>
    <div className="labelCube redCube num8-9"></div>
    <div className="labelCube redCube num8-10"></div>
  </div>,
  9: <div className="labelLetterM">
    <div className="labelCube redCube num9-1"></div>
    <div className="labelCube redCube num9-2"></div>
    <div className="labelCube redCube num9-3"></div>
    <div className="labelCube redCube num9-4"></div>
    <div className="labelCube redCube num9-5"></div>
    <div className="labelCube redCube num9-6"></div>
    <div className="labelCube redCube num9-7"></div>
    <div className="labelCube redCube num9-8"></div>
    <div className="labelCube redCube num9-9"></div>
    <div className="labelCube redCube num9-10"></div>
    <div className="labelCube redCube num9-11"></div>
    <div className="labelCube redCube num9-12"></div>
    <div className="labelCube redCube num9-13"></div>
  </div>,
  ':': <div className="labelLetterS">
    <div className="labelCube redCube dot-1"></div>
    <div className="labelCube redCube dot-2"></div>
  </div>,
  ' ': <div className="labelLetterS">
  </div>,
};

const whiteAlphabet: AlphabetInterface = {
  a: <div className="labelLetterM">
    <div className="labelCube whiteCube a1"></div>
    <div className="labelCube whiteCube a2"></div>
    <div className="labelCube whiteCube a3"></div>
    <div className="labelCube whiteCube a4"></div>
    <div className="labelCube whiteCube a5"></div>
    <div className="labelCube whiteCube a6"></div>
    <div className="labelCube whiteCube a7"></div>
    <div className="labelCube whiteCube a8"></div>
    <div className="labelCube whiteCube a9"></div>
    <div className="labelCube whiteCube a10"></div>
    <div className="labelCube whiteCube a11"></div>
    <div className="labelCube whiteCube a12"></div>
    <div className="labelCube whiteCube a13"></div>
  </div>,
  b: <div className="labelLetterM">
    <div className="labelCube whiteCube b1"></div>
    <div className="labelCube whiteCube b2"></div>
    <div className="labelCube whiteCube b3"></div>
    <div className="labelCube whiteCube b4"></div>
    <div className="labelCube whiteCube b5"></div>
    <div className="labelCube whiteCube b6"></div>
    <div className="labelCube whiteCube b7"></div>
    <div className="labelCube whiteCube b8"></div>
    <div className="labelCube whiteCube b9"></div>
    <div className="labelCube whiteCube b10"></div>
    <div className="labelCube whiteCube b11"></div>
    <div className="labelCube whiteCube b12"></div>
    <div className="labelCube whiteCube b13"></div>
  </div>,
  c: <div className="labelLetterM">
    <div className="labelCube whiteCube c1"></div>
    <div className="labelCube whiteCube c2"></div>
    <div className="labelCube whiteCube c3"></div>
    <div className="labelCube whiteCube c4"></div>
    <div className="labelCube whiteCube c5"></div>
    <div className="labelCube whiteCube c6"></div>
    <div className="labelCube whiteCube c7"></div>
    <div className="labelCube whiteCube c8"></div>
    <div className="labelCube whiteCube c9"></div>
  </div>,
  d: <div className="labelLetterM">
    <div className="labelCube whiteCube d1"></div>
    <div className="labelCube whiteCube d2"></div>
    <div className="labelCube whiteCube d3"></div>
    <div className="labelCube whiteCube d4"></div>
    <div className="labelCube whiteCube d5"></div>
    <div className="labelCube whiteCube d6"></div>
    <div className="labelCube whiteCube d7"></div>
    <div className="labelCube whiteCube d8"></div>
    <div className="labelCube whiteCube d9"></div>
    <div className="labelCube whiteCube d10"></div>
    <div className="labelCube whiteCube d11"></div>
    <div className="labelCube whiteCube d12"></div>
  </div>,
  e: <div className="labelLetterM">
    <div className="labelCube whiteCube e1"></div>
    <div className="labelCube whiteCube e2"></div>
    <div className="labelCube whiteCube e3"></div>
    <div className="labelCube whiteCube e4"></div>
    <div className="labelCube whiteCube e5"></div>
    <div className="labelCube whiteCube e6"></div>
    <div className="labelCube whiteCube e7"></div>
    <div className="labelCube whiteCube e8"></div>
    <div className="labelCube whiteCube e9"></div>
    <div className="labelCube whiteCube e10"></div>
    <div className="labelCube whiteCube e11"></div>
    <div className="labelCube whiteCube e12"></div>
    <div className="labelCube whiteCube e13"></div>
  </div>,
  f: <div className="labelLetterM">
    <div className="labelCube whiteCube f1"></div>
    <div className="labelCube whiteCube f2"></div>
    <div className="labelCube whiteCube f3"></div>
    <div className="labelCube whiteCube f4"></div>
    <div className="labelCube whiteCube f5"></div>
    <div className="labelCube whiteCube f6"></div>
    <div className="labelCube whiteCube f7"></div>
    <div className="labelCube whiteCube f8"></div>
    <div className="labelCube whiteCube f9"></div>
    <div className="labelCube whiteCube f10"></div>
  </div>,
  g: <div className="labelLetterM">
    <div className="labelCube whiteCube g1"></div>
    <div className="labelCube whiteCube g2"></div>
    <div className="labelCube whiteCube g3"></div>
    <div className="labelCube whiteCube g4"></div>
    <div className="labelCube whiteCube g5"></div>
    <div className="labelCube whiteCube g6"></div>
    <div className="labelCube whiteCube g7"></div>
    <div className="labelCube whiteCube g8"></div>
    <div className="labelCube whiteCube g9"></div>
    <div className="labelCube whiteCube g10"></div>
    <div className="labelCube whiteCube g11"></div>
    <div className="labelCube whiteCube g12"></div>
  </div>,
  h: <div className="labelLetterM">
    <div className="labelCube whiteCube h1"></div>
    <div className="labelCube whiteCube h2"></div>
    <div className="labelCube whiteCube h3"></div>
    <div className="labelCube whiteCube h4"></div>
    <div className="labelCube whiteCube h5"></div>
    <div className="labelCube whiteCube h6"></div>
    <div className="labelCube whiteCube h7"></div>
    <div className="labelCube whiteCube h8"></div>
    <div className="labelCube whiteCube h9"></div>
    <div className="labelCube whiteCube h10"></div>
    <div className="labelCube whiteCube h11"></div>
    <div className="labelCube whiteCube h12"></div>
  </div>,
  i: <div className="labelLetterS">
    <div className="labelCube whiteCube i1"></div>
    <div className="labelCube whiteCube i2"></div>
    <div className="labelCube whiteCube i3"></div>
    <div className="labelCube whiteCube i4"></div>
    <div className="labelCube whiteCube i5"></div>
    <div className="labelCube whiteCube i6"></div>
    <div className="labelCube whiteCube i7"></div>
    <div className="labelCube whiteCube i8"></div>
    <div className="labelCube whiteCube i9"></div>
  </div>,
  j: <div className="labelLetter">
    <div className="labelCube whiteCube j1"></div>
    <div className="labelCube whiteCube j2"></div>
    <div className="labelCube whiteCube j3"></div>
    <div className="labelCube whiteCube j4"></div>
    <div className="labelCube whiteCube j5"></div>
    <div className="labelCube whiteCube j6"></div>
    <div className="labelCube whiteCube j7"></div>
    <div className="labelCube whiteCube j8"></div>
    <div className="labelCube whiteCube j9"></div>
    <div className="labelCube whiteCube j10"></div>
    <div className="labelCube whiteCube j11"></div>
  </div>,
  k: <div className="labelLetterM">
    <div className="labelCube whiteCube k1"></div>
    <div className="labelCube whiteCube k2"></div>
    <div className="labelCube whiteCube k3"></div>
    <div className="labelCube whiteCube k4"></div>
    <div className="labelCube whiteCube k5"></div>
    <div className="labelCube whiteCube k6"></div>
    <div className="labelCube whiteCube k7"></div>
    <div className="labelCube whiteCube k8"></div>
    <div className="labelCube whiteCube k9"></div>
    <div className="labelCube whiteCube k10"></div>
  </div>,
  l: <div className="labelLetterM">
    <div className="labelCube whiteCube l1"></div>
    <div className="labelCube whiteCube l2"></div>
    <div className="labelCube whiteCube l3"></div>
    <div className="labelCube whiteCube l4"></div>
    <div className="labelCube whiteCube l5"></div>
    <div className="labelCube whiteCube l6"></div>
    <div className="labelCube whiteCube l7"></div>
    <div className="labelCube whiteCube l8"></div>
  </div>,
  m: <div className="labelLetter">
    <div className="labelCube whiteCube m1"></div>
    <div className="labelCube whiteCube m2"></div>
    <div className="labelCube whiteCube m3"></div>
    <div className="labelCube whiteCube m4"></div>
    <div className="labelCube whiteCube m5"></div>
    <div className="labelCube whiteCube m6"></div>
    <div className="labelCube whiteCube m7"></div>
    <div className="labelCube whiteCube m8"></div>
    <div className="labelCube whiteCube m9"></div>
    <div className="labelCube whiteCube m10"></div>
    <div className="labelCube whiteCube m11"></div>
    <div className="labelCube whiteCube m12"></div>
    <div className="labelCube whiteCube m13"></div>
  </div>,
  n: <div className="labelLetterM">
    <div className="labelCube whiteCube n1"></div>
    <div className="labelCube whiteCube n2"></div>
    <div className="labelCube whiteCube n3"></div>
    <div className="labelCube whiteCube n4"></div>
    <div className="labelCube whiteCube n5"></div>
    <div className="labelCube whiteCube n6"></div>
    <div className="labelCube whiteCube n7"></div>
    <div className="labelCube whiteCube n8"></div>
    <div className="labelCube whiteCube n9"></div>
    <div className="labelCube whiteCube n10"></div>
    <div className="labelCube whiteCube n11"></div>
    <div className="labelCube whiteCube n12"></div>
  </div>,
  o: <div className="labelLetterM">
    <div className="labelCube whiteCube o1"></div>
    <div className="labelCube whiteCube o2"></div>
    <div className="labelCube whiteCube o3"></div>
    <div className="labelCube whiteCube o4"></div>
    <div className="labelCube whiteCube o5"></div>
    <div className="labelCube whiteCube o6"></div>
    <div className="labelCube whiteCube o7"></div>
    <div className="labelCube whiteCube o8"></div>
    <div className="labelCube whiteCube o9"></div>
    <div className="labelCube whiteCube o10"></div>
    <div className="labelCube whiteCube o11"></div>
  </div>,
  p: <div className="labelLetterM">
    <div className="labelCube whiteCube p1"></div>
    <div className="labelCube whiteCube p2"></div>
    <div className="labelCube whiteCube p3"></div>
    <div className="labelCube whiteCube p4"></div>
    <div className="labelCube whiteCube p5"></div>
    <div className="labelCube whiteCube p6"></div>
    <div className="labelCube whiteCube p7"></div>
    <div className="labelCube whiteCube p8"></div>
    <div className="labelCube whiteCube p9"></div>
    <div className="labelCube whiteCube p10"></div>
    <div className="labelCube whiteCube p11"></div>
  </div>,
  q: <div className="labelLetter">
    <div className="labelCube whiteCube q1"></div>
    <div className="labelCube whiteCube q2"></div>
    <div className="labelCube whiteCube q3"></div>
    <div className="labelCube whiteCube q4"></div>
    <div className="labelCube whiteCube q5"></div>
    <div className="labelCube whiteCube q6"></div>
    <div className="labelCube whiteCube q7"></div>
    <div className="labelCube whiteCube q8"></div>
    <div className="labelCube whiteCube q9"></div>
    <div className="labelCube whiteCube q10"></div>
    <div className="labelCube whiteCube q11"></div>
    <div className="labelCube whiteCube q12"></div>
  </div>,
  r: <div className="labelLetterM">
    <div className="labelCube whiteCube r1"></div>
    <div className="labelCube whiteCube r2"></div>
    <div className="labelCube whiteCube r3"></div>
    <div className="labelCube whiteCube r4"></div>
    <div className="labelCube whiteCube r5"></div>
    <div className="labelCube whiteCube r6"></div>
    <div className="labelCube whiteCube r7"></div>
    <div className="labelCube whiteCube r8"></div>
    <div className="labelCube whiteCube r9"></div>
    <div className="labelCube whiteCube r10"></div>
    <div className="labelCube whiteCube r11"></div>
    <div className="labelCube whiteCube r12"></div>
  </div>,
  s: <div className="labelLetterM">
    <div className="labelCube whiteCube s1"></div>
    <div className="labelCube whiteCube s2"></div>
    <div className="labelCube whiteCube s3"></div>
    <div className="labelCube whiteCube s4"></div>
    <div className="labelCube whiteCube s5"></div>
    <div className="labelCube whiteCube s6"></div>
    <div className="labelCube whiteCube s7"></div>
    <div className="labelCube whiteCube s8"></div>
    <div className="labelCube whiteCube s9"></div>
    <div className="labelCube whiteCube s10"></div>
  </div>,
  t: <div className="labelLetter">
    <div className="labelCube whiteCube t1"></div>
    <div className="labelCube whiteCube t2"></div>
    <div className="labelCube whiteCube t3"></div>
    <div className="labelCube whiteCube t4"></div>
    <div className="labelCube whiteCube t5"></div>
    <div className="labelCube whiteCube t6"></div>
    <div className="labelCube whiteCube t7"></div>
    <div className="labelCube whiteCube t8"></div>
    <div className="labelCube whiteCube t9"></div>
  </div>,
  u: <div className="labelLetterM">
    <div className="labelCube whiteCube u1"></div>
    <div className="labelCube whiteCube u2"></div>
    <div className="labelCube whiteCube u3"></div>
    <div className="labelCube whiteCube u4"></div>
    <div className="labelCube whiteCube u5"></div>
    <div className="labelCube whiteCube u6"></div>
    <div className="labelCube whiteCube u7"></div>
    <div className="labelCube whiteCube u8"></div>
    <div className="labelCube whiteCube u9"></div>
    <div className="labelCube whiteCube u10"></div>
  </div>,
  v: <div className="labelLetterM">
    <div className="labelCube whiteCube v1"></div>
    <div className="labelCube whiteCube v2"></div>
    <div className="labelCube whiteCube v3"></div>
    <div className="labelCube whiteCube v4"></div>
    <div className="labelCube whiteCube v5"></div>
    <div className="labelCube whiteCube v6"></div>
    <div className="labelCube whiteCube v7"></div>
    <div className="labelCube whiteCube v8"></div>
    <div className="labelCube whiteCube v9"></div>
  </div>,
  w: <div className="labelLetter">
    <div className="labelCube whiteCube w1"></div>
    <div className="labelCube whiteCube w2"></div>
    <div className="labelCube whiteCube w3"></div>
    <div className="labelCube whiteCube w4"></div>
    <div className="labelCube whiteCube w5"></div>
    <div className="labelCube whiteCube w6"></div>
    <div className="labelCube whiteCube w7"></div>
    <div className="labelCube whiteCube w8"></div>
    <div className="labelCube whiteCube w9"></div>
    <div className="labelCube whiteCube w10"></div>
    <div className="labelCube whiteCube w11"></div>
    <div className="labelCube whiteCube w12"></div>
    <div className="labelCube whiteCube w13"></div>
    <div className="labelCube whiteCube w14"></div>
  </div>,
  x: <div className="labelLetterM">
    <div className="labelCube whiteCube x1"></div>
    <div className="labelCube whiteCube x2"></div>
    <div className="labelCube whiteCube x3"></div>
    <div className="labelCube whiteCube x4"></div>
    <div className="labelCube whiteCube x5"></div>
    <div className="labelCube whiteCube x6"></div>
    <div className="labelCube whiteCube x7"></div>
    <div className="labelCube whiteCube x8"></div>
    <div className="labelCube whiteCube x9"></div>
    <div className="labelCube whiteCube x10"></div>
    <div className="labelCube whiteCube x11"></div>
  </div>,
  y: <div className="labelLetterM">
    <div className="labelCube whiteCube y1"></div>
    <div className="labelCube whiteCube y2"></div>
    <div className="labelCube whiteCube y3"></div>
    <div className="labelCube whiteCube y4"></div>
    <div className="labelCube whiteCube y5"></div>
    <div className="labelCube whiteCube y6"></div>
    <div className="labelCube whiteCube y7"></div>
    <div className="labelCube whiteCube y8"></div>
    <div className="labelCube whiteCube y9"></div>
    <div className="labelCube whiteCube y10"></div>
  </div>,
  z: <div className="labelLetterM">
    <div className="labelCube whiteCube z1"></div>
    <div className="labelCube whiteCube z2"></div>
    <div className="labelCube whiteCube z3"></div>
    <div className="labelCube whiteCube z4"></div>
    <div className="labelCube whiteCube z5"></div>
    <div className="labelCube whiteCube z6"></div>
    <div className="labelCube whiteCube z7"></div>
    <div className="labelCube whiteCube z8"></div>
    <div className="labelCube whiteCube z9"></div>
    <div className="labelCube whiteCube z10"></div>
    <div className="labelCube whiteCube z11"></div>
    <div className="labelCube whiteCube z12"></div>
  </div>,
  1: <div className="labelLetterS">
    <div className="labelCube whiteCube num1-1"></div>
    <div className="labelCube whiteCube num1-2"></div>
    <div className="labelCube whiteCube num1-3"></div>
    <div className="labelCube whiteCube num1-4"></div>
    <div className="labelCube whiteCube num1-5"></div>
    <div className="labelCube whiteCube num1-6"></div>
    <div className="labelCube whiteCube num1-7"></div>
  </div>,
  2: <div className="labelLetterM">
    <div className="labelCube whiteCube num2-1"></div>
    <div className="labelCube whiteCube num2-2"></div>
    <div className="labelCube whiteCube num2-3"></div>
    <div className="labelCube whiteCube num2-4"></div>
    <div className="labelCube whiteCube num2-5"></div>
    <div className="labelCube whiteCube num2-6"></div>
    <div className="labelCube whiteCube num2-7"></div>
    <div className="labelCube whiteCube num2-8"></div>
    <div className="labelCube whiteCube num2-9"></div>
    <div className="labelCube whiteCube num2-10"></div>
    <div className="labelCube whiteCube num2-11"></div>
  </div>,
  3: <div className="labelLetterM">
    <div className="labelCube whiteCube num3-1"></div>
    <div className="labelCube whiteCube num3-2"></div>
    <div className="labelCube whiteCube num3-3"></div>
    <div className="labelCube whiteCube num3-4"></div>
    <div className="labelCube whiteCube num3-5"></div>
    <div className="labelCube whiteCube num3-6"></div>
    <div className="labelCube whiteCube num3-7"></div>
    <div className="labelCube whiteCube num3-8"></div>
    <div className="labelCube whiteCube num3-9"></div>
    <div className="labelCube whiteCube num3-10"></div>
  </div>,
  4: <div className="labelLetterM">
    <div className="labelCube whiteCube num4-1"></div>
    <div className="labelCube whiteCube num4-2"></div>
    <div className="labelCube whiteCube num4-3"></div>
    <div className="labelCube whiteCube num4-4"></div>
    <div className="labelCube whiteCube num4-5"></div>
    <div className="labelCube whiteCube num4-6"></div>
    <div className="labelCube whiteCube num4-7"></div>
    <div className="labelCube whiteCube num4-8"></div>
    <div className="labelCube whiteCube num4-9"></div>
  </div>,
  5: <div className="labelLetterM">
    <div className="labelCube whiteCube num5-1"></div>
    <div className="labelCube whiteCube num5-2"></div>
    <div className="labelCube whiteCube num5-3"></div>
    <div className="labelCube whiteCube num5-4"></div>
    <div className="labelCube whiteCube num5-5"></div>
    <div className="labelCube whiteCube num5-6"></div>
    <div className="labelCube whiteCube num5-7"></div>
    <div className="labelCube whiteCube num5-8"></div>
    <div className="labelCube whiteCube num5-9"></div>
    <div className="labelCube whiteCube num5-10"></div>
    <div className="labelCube whiteCube num5-11"></div>
    <div className="labelCube whiteCube num5-12"></div>
    <div className="labelCube whiteCube num5-13"></div>
  </div>,
  6: <div className="labelLetterM">
    <div className="labelCube whiteCube num6-1"></div>
    <div className="labelCube whiteCube num6-2"></div>
    <div className="labelCube whiteCube num6-3"></div>
    <div className="labelCube whiteCube num6-4"></div>
    <div className="labelCube whiteCube num6-5"></div>
    <div className="labelCube whiteCube num6-6"></div>
    <div className="labelCube whiteCube num6-7"></div>
    <div className="labelCube whiteCube num6-8"></div>
    <div className="labelCube whiteCube num6-9"></div>
    <div className="labelCube whiteCube num6-10"></div>
    <div className="labelCube whiteCube num6-11"></div>
    <div className="labelCube whiteCube num6-12"></div>
  </div>,
  7: <div className="labelLetterM">
    <div className="labelCube whiteCube num7-1"></div>
    <div className="labelCube whiteCube num7-2"></div>
    <div className="labelCube whiteCube num7-3"></div>
    <div className="labelCube whiteCube num7-4"></div>
    <div className="labelCube whiteCube num7-5"></div>
    <div className="labelCube whiteCube num7-6"></div>
    <div className="labelCube whiteCube num7-7"></div>
    <div className="labelCube whiteCube num7-8"></div>
  </div>,
  8: <div className="labelLetterM">
    <div className="labelCube whiteCube num8-1"></div>
    <div className="labelCube whiteCube num8-2"></div>
    <div className="labelCube whiteCube num8-3"></div>
    <div className="labelCube whiteCube num8-4"></div>
    <div className="labelCube whiteCube num8-5"></div>
    <div className="labelCube whiteCube num8-6"></div>
    <div className="labelCube whiteCube num8-7"></div>
    <div className="labelCube whiteCube num8-8"></div>
    <div className="labelCube whiteCube num8-9"></div>
    <div className="labelCube whiteCube num8-10"></div>
  </div>,
  9: <div className="labelLetterM">
    <div className="labelCube whiteCube num9-1"></div>
    <div className="labelCube whiteCube num9-2"></div>
    <div className="labelCube whiteCube num9-3"></div>
    <div className="labelCube whiteCube num9-4"></div>
    <div className="labelCube whiteCube num9-5"></div>
    <div className="labelCube whiteCube num9-6"></div>
    <div className="labelCube whiteCube num9-7"></div>
    <div className="labelCube whiteCube num9-8"></div>
    <div className="labelCube whiteCube num9-9"></div>
    <div className="labelCube whiteCube num9-10"></div>
    <div className="labelCube whiteCube num9-11"></div>
    <div className="labelCube whiteCube num9-12"></div>
    <div className="labelCube whiteCube num9-13"></div>
  </div>,
  ':': <div className="labelLetterS">
    <div className="labelCube whiteCube dot-1"></div>
    <div className="labelCube whiteCube dot-2"></div>
  </div>,
  ' ': <div className="labelLetterS">
  </div>,
};

interface SquareLabelInterface {
  label: any;
  additionalClassName?: string;
  red?: boolean;
  white?: boolean;
}

const PlayerLabel: React.SFC<SquareLabelInterface> = (props) => {

  return (
    <div className={`labelTitle ${props.additionalClassName !== undefined
      ? props.additionalClassName : ''}`}>
      {
        [...props.label.toLowerCase()].map((c, i) => {
          return props.red ? <div key={`redA_${i}`}> {redAlphabet[c]} </div> :
            props.white ? <div key={`whiteA_${i}`}> {whiteAlphabet[c]} </div>
              :
              <div key={`alph_${i}`}> {alphabet[c]} </div>;
        })
      }
    </div>
  );
};

export default PlayerLabel;
