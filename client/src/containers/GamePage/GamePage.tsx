import React, { Component, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Socket from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import { position } from '../../types/gameTypes';
import UseSocket from './UseSocket';

import './style.css';

const styles: any = {
    effectL0_1: {
        // translate: "-1vw,-4vw",
        backgroundColor: "yellow",
        // width: "400px"
    }
}

interface GamePageProps {
    nagivation: any,
    history: any,
    socket: SocketIOClient.Socket,
    match: any,
    started: boolean,
    room: string,
    player: string,
    board: number[][],
    piece: number[][][],
    pieceIndex: number,
    position: position,
    reset: Function,
    startGame: Function,
    endGame: Function,
    rotate: Function,
    moveDown: Function,
}

const GamePage: React.SFC<GamePageProps> = props => {
    const [room, setRoom] = useState("");
    const [roomClassName, setRoomClassName] = useState('');
    const [player, setPlayer] = useState("");
    const [playerClassName, setPlayerClassName] = useState('');
    const [socket, setSocket] = useState(Socket);
    const initialRowDestruction: number[] = [];
    const [row, setRow] = useState(initialRowDestruction);
    useEffect(() => {
        if (props.board && props.board !== undefined) {
            // let row: number[] = [];
            setRow([]);
            console.log("changed")
            for (let i = 0; i < props.board.length; i++) {
                let nbEmpty = 0;
                for (let j = 0; j < props.board[i].length; j++) {
                    if (props.board[i][j] === 0) {
                        nbEmpty++;
                    }
                }
                if (nbEmpty === 0) {
                    setRow([...row, i]);
                }
            }
            console.log("ROW", row);
        }
    }, [props.board])

    useEffect(() => {
        if (props.started) {
            document.addEventListener("keyup", async (e) => {
                switch (e.key) {
                    case "ArrowLeft":
                        socket.emit('left');
                        return;
                    case "ArrowRight":
                        socket.emit('right');
                        return;
                    case "ArrowDown":
                        socket.emit('down');
                        return;
                    case "ArrowUp":
                        socket.emit('up');
                        return;
                }
            })
            return function cleanup() {
                document.removeEventListener("keydown", () => { });
            }
        }
    }, [socket]);

    const play = async (event: any) => {
        event.preventDefault();
        await props.startGame(room, player);
        const s = socketIOClient('http://localhost:4000', {
            transports: ['websocket'],
            query: {
                room: room,
                pseudo: player
            }
        });
        setSocket(s);
        s.emit('init');
        props.history.push(`/#${room}[${player}]`);
    }

    const reset = () => {
        props.reset();
    }

    const rotate = () => {
        props.rotate(props.pieceIndex);
    }

    const moveDown = () => {
        props.moveDown(props.position.x, props.position.y, props.board, props.piece, props.pieceIndex);
    }

    const handleChange = (event: any) => {
        if (event.target.name === "room") {
            setRoom(event.target.value);
        } else if (event.target.name = "player") {
            setPlayer(event.target.value);
        }
    }

    const renderBoard = () => {
        let i = 0;
        let j = 0;
        return (
            <div className="board">
                {props.board.map((d: any) => {
                    return (
                        <div key={i++} className="boardRow">
                            {
                                d.map((c: any) => {
                                    return (
                                        <div key={j++} className={`boardCell c${c}`}>{/*c*/}</div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    const renderBoard2 = () => {
        let i = 0;
        let j = 0;
        return (
            <div className="board">

                {props.board.map((d: any) => {
                    let r = 0;
                    return (
                        <div key={i++} className={row.includes(i - 1) ? "boardRowDestructionOK" : "boardRowDestruction"}>
                            {row.includes(i) && console.log("OOOOOOOPPPPPPPPPPPPPPPPPPPPPP")}
                            {console.log("testttt", i - 1, row)}
                            {
                                d.map((c: any) => {
                                    return (
                                        <div key={j++} className="destructionRow">
                                            <div className="destructionCol">
                                                {/* {console.log(i,j)} */}
                                                <div className={`boardCellDestruction effectL${r}`}>{}</div>
                                                <div className={`boardCellDestruction effectR${r}`}>{}</div>
                                            </div>
                                            <div className="destructionCol">
                                                <div className={`boardCellDestruction effectT${r}`}>{}</div>
                                                <div className={`boardCellDestruction effectB${r++}`}>{}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderTitle() {
        return (
            <div className="redTetris">
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
                <div className="box boxT">
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
                <div className="box boxT">
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
                <div className="box boxI">
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
        )
    }

    function roomShake() {
        setRoomClassName("shake");
        setTimeout(() => {
            setRoomClassName("");
        }, 1000)
    }

    function playerShake() {
        setPlayerClassName("shake");
        setTimeout(() => {
            setPlayerClassName("");
        }, 1000)
    }

    function renderRoomLabel() {
        return (
            <div className="labelTitle">
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
                <div className="labelLetter">
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
                    <div className="labelCube o12"></div>
                    <div className="labelCube o13"></div>
                    <div className="labelCube o14"></div>
                    <div className="labelCube o15"></div>
                    <div className="labelCube o16"></div>
                </div>
                <div className="labelLetter">
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
                    <div className="labelCube o12"></div>
                    <div className="labelCube o13"></div>
                    <div className="labelCube o14"></div>
                    <div className="labelCube o15"></div>
                    <div className="labelCube o16"></div>
                </div>
                <div className="labelLetter">
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
                </div>
            </div>
        )
    }

    function renderPlayerLabel() {
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


    return (
        <div>
            <div className="mainDiv">
                <div className="sectionLeft">

                    <form className="formFlex" onSubmit={play}>
                        {room !== '' && renderRoomLabel()}
                        <div className="namer">
                            <div className="namer-input">
                                <input
                                    onBlur={roomShake}
                                    className={roomClassName} name="room" type="text" placeholder="ROOM" onChange={handleChange}></input>
                            </div>
                        </div>
                        {player !== '' && renderPlayerLabel()}
                        <div className="namer">
                            <div className="namer-input">
                                <input
                                    onBlur={playerShake}
                                    className={playerClassName}
                                    name="player" type="text" placeholder="PLAYER" onChange={handleChange}></input>
                            </div>
                        </div>
                        <button type="submit" className="plus" disabled={room === "" || player === ""}></button>
                    </form>
                    <div>
                        {props.piece}
                    </div>
                    <div>
                        {props.piece[props.pieceIndex]}
                    </div>
                    <div>
                    </div>
                </div>
                <div className="outerBoard">
                    {renderTitle()}
                    <div className="boardSpace">
                        <svg className="pulse" viewBox="0 0 1024 1024" version="1.1">
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                        </svg>
                        <div className="boardInner">
                            <div className="bar top "></div>
                            <div className="bar right delay"></div>
                            <div className="bar bottom delay"></div>
                            <div className="bar left "></div>
                            {renderBoard()}
                            {renderBoard2()}
                        </div>
                    </div>
                </div>
                {/* <button onClick={rotate}>UP</button>
                <button onClick={moveDown}>DOWN</button>
                <button onClick={reset}>RESET</button> */}
                <UseSocket socket={socket} />
            </div>
        </div>
    )
}

export default GamePage;