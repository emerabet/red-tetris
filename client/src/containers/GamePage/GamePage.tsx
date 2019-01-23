import React, { Component, useState } from 'react';
import Socket from 'socket.io-client';
import { position } from '../../types/gameTypes';

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

    const play = async (event: any) => {
        event.preventDefault();
        await props.startGame(room, player);
        props.history.push(`/#${props.room}[${props.player}]`);
    }

    const reset = () => {
        props.reset();
    }

    const rotate = () => {
        props.rotate(props.pieceIndex);
    }

    const moveDown = () => {
        console.log("PROPSSSSSSSSSSSSSS//////////////////////////", props)
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
            </div>
        </div>
    )
}

export default GamePage;