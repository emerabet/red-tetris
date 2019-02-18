import React, { Component, useState, useEffect } from 'react';
import RoomLabel from '../Labels/RoomLabel';
import PlayerLabel from '../Labels/PlayerLabel';
import SquareLabel from '../Labels';

import './style.css';

interface HomeProps {
    room: string;
    player: string;
    play: (event: any) => {};
    handleChange: (event: any) => void;

}

const Home: React.SFC<HomeProps> = (props) => {
    const [roomClassName, setRoomClassName] = useState('');
    const [playerClassName, setPlayerClassName] = useState('');

    function roomShake() {
        setRoomClassName('shake');
        setTimeout(() => {
            setRoomClassName('');
        }, 1000)
    }

    function playerShake() {
        setPlayerClassName('shake');
        setTimeout(() => {
            setPlayerClassName('');
        }, 1000)
    }

    return (
        <form className="formFlex" onSubmit={props.play}>
            {props.room !== '' && <SquareLabel label="room" />}
            <div className="namer">
                <div className="namer-input">
                    <input
                        onBlur={roomShake}
                        className={roomClassName}
                        name="room"
                        type="text"
                        placeholder="ROOM"
                        value={props.room}
                        onChange={props.handleChange}></input>
                </div>
            </div>
            {props.player !== '' && <SquareLabel label="player" />}
            <div className="namer">
                <div className="namer-input">
                    <input
                        onBlur={playerShake}
                        className={playerClassName}
                        name="player"
                        type="text"
                        placeholder="PLAYER"
                        value={props.player}
                        onChange={props.handleChange}></input>
                </div>
            </div>
            <button
                type="submit"
                className="plus"
                disabled={props.room === '' || props.player === ''}></button>
        </form>
    )
}

export default Home;
