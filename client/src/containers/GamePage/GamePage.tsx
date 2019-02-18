import React, { Component, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Socket from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import { position } from '../../types/gameTypes';
import UseSocket from './UseSocket';
import Home from '../../components/Home/Home';
import RedTetris from '../../components/RedTetris/RedTetris';

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
    const [player, setPlayer] = useState("");
    const [started, setStarted] = useState(false);
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
        setStarted(true);
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



    return (
        <div>


            {!started
                ?
                <div className="mainDiv flexColumn">
                    <RedTetris />
                    <Home
                        room={room}
                        player={player}
                        play={play}
                        handleChange={handleChange}
                    />
                </div>
                :
                <div className="mainDiv flexRow">

                    <div className="sectionLeft">
                        <RedTetris additionalClassName="small" />
                        <Home
                            room={room}
                            player={player}
                            play={play}
                            handleChange={handleChange}
                        />
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
                    <div className="sectionRight">
                        Opponents
                    </div>
                    {/* <button onClick={rotate}>UP</button>
<button onClick={moveDown}>DOWN</button>
<button onClick={reset}>RESET</button> */}
                    <UseSocket socket={socket} />
                </div>

            }

        </div>
    )
}

export default GamePage;