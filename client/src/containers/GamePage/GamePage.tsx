import React, { Component, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Socket from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import { position } from '../../types/gameTypes';
import UseSocket from './UseSocket';

import './style.css';

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
    const [socket, setSocket] = useState(Socket);

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
        props.history.push(`/#${props.room}[${props.player}]`);
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
                                        <div key={j++} className={`boardCell c${c}`}>{c}</div>
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
            test Game page {props.started && "started"} ad {props.room} {props.player}
            <div className="mainDiv">
                <form onSubmit={play}>
                    <input name="room" type="text" placeholder="room" onChange={handleChange}></input>
                    <input name="player" type="text" placeholder="player" onChange={handleChange}></input>
                    <button type="submit" disabled={room === "" || player === ""}> Play </button>
                </form>
                <div>
                    {props.piece}
                </div>
                <div>
                    {props.piece[props.pieceIndex]}
                </div>
                <div>
                    x:{props.position.x}/y:{props.position.y}
                </div>
                {renderBoard()}
                <button onClick={rotate}>UP</button>
                <button onClick={moveDown}>DOWN</button>
                <button onClick={reset}>RESET</button>
                <UseSocket socket={socket} />
            </div>
        </div>
    )
}

export default GamePage;