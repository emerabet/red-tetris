import React, { Component, useState } from 'react';
import Button from '../../components/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import withSocket from '../../Hoc/SocketHoc';
import Socket from 'socket.io-client';
import { startGameAsync, endGameAsync, rotateAsync, moveDownAsync, reset } from '../../actions/gameActions';
import { getType, StateType } from 'typesafe-actions';
import { position } from '../../types/gameTypes';
import rootReducer from '../../reducers/index'
var events = require('events');
var eventEmitter = new events.EventEmitter();

import './style.css';

let timer: any = null;

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

interface GamePageState {
    room: string,
    player: string,
}

const GamePage: any = (props: any) => {
    //const [room, setRoom] = useState("");
    //const [player, setPlayer] = useState("");
    let room = "te";
    let player = "pw";

    const setRoom = (a: any) => { }
    const setPlayer = (a: any) => { }
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
        // this.setState({ [event.target.name]: event.target.value });
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

// class GamePage extends Component<GamePageProps, GamePageState> {

//     constructor(props: GamePageProps) {
//         super(props);
//         this.state = {
//             room: "",
//             player: "",
//         };

//         this.reset = this.reset.bind(this);
//         this.play = this.play.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.end = this.end.bind(this);
//         this.renderBoard = this.renderBoard.bind(this);
//         this.rotate = this.rotate.bind(this);
//         this.moveDown = this.moveDown.bind(this);
//     }

//     componentDidMount() {
//         console.log(window.location.hash)
//     }

//     reset() {
//         this.props.reset();
//     }

//     play(event: any) {
//         event.preventDefault();
//         this.props.startGame(this.state.room, this.state.player);
//         this.props.history.push(`/#${this.props.room}[${this.props.player}]`);
//         timer = setInterval(() => {
//             this.moveDown()
//         }, 1000)
//     }

//     end() {
//         this.props.endGame();
//         clearInterval(timer);
//     }

//     handleChange(event: any) {
//         // this.setState({ [event.target.name]: event.target.value });
//         if (event.target.name === "room") {
//             this.setState({ room: event.target.value });
//         } else if (event.target.name = "player") {
//             this.setState({ player: event.target.value });
//         }
//     }

//     renderBoard() {
//         let i = 0;
//         let j = 0;
//         return (
//             <div className="board">
//                 {this.props.board.map((d) => {
//                     return (
//                         <div key={i++} className="boardRow">
//                             {
//                                 d.map((c) => {
//                                     return (
//                                         <div key={j++} className={`boardCell c${c}`}>{c}</div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }

//     rotate() {
//         this.props.rotate(this.props.pieceIndex);
//     }

//     moveDown() {
//         this.props.moveDown(this.props.position.x, this.props.position.y, this.props.board, this.props.piece, this.props.pieceIndex);
//     }

//     render() {
//         return (
//             <div>
//                 test Game page {this.props.started && "started"} ad {this.props.room} {this.props.player}
//                 <div className="mainDiv">
//                     <form onSubmit={this.play}>
//                         <input name="room" type="text" placeholder="room" onChange={this.handleChange}></input>
//                         <input name="player" type="text" placeholder="player" onChange={this.handleChange}></input>
//                         <button type="submit" disabled={this.state.room === "" || this.state.player === ""}> Play </button>
//                     </form>
//                     <button onClick={this.end}> END </button>
//                     <div>
//                         {this.props.piece}
//                     </div>
//                     <div>
//                         {this.props.piece[this.props.pieceIndex]}
//                     </div>
//                     <div>
//                         x:{this.props.position.x}/y:{this.props.position.y}
//                     </div>
//                     {this.renderBoard()}
//                     <button onClick={this.rotate}>UP</button>
//                     <button onClick={this.moveDown}>DOWN</button>
//                     <button onClick={this.reset}>RESET</button>
//                 </div>
//             </div>
//         )
//     }
// }

function mapStateToProps(state: StateType<typeof rootReducer>) {
    return {
        started: state.game.started,
        room: state.game.room,
        player: state.game.player,
        board: state.game.board,
        piece: state.game.piece,
        pieceIndex: state.game.pieceIndex,
        position: state.game.position,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        reset: () => dispatch(reset()),
        startGame: (room: string, player: string) => dispatch(startGameAsync({ room: room, player: player })),
        endGame: () => dispatch(endGameAsync()),
        rotate: (pieceIndex: number) => dispatch(rotateAsync({ pieceIndex: pieceIndex })),
        moveDown: (x: number, y: number, board: number[][], piece: number[][][], pieceIndex: number) => dispatch(moveDownAsync({ position: { x: x, y: y }, board: board, piece: piece, pieceIndex: pieceIndex })),
    }
}

export default withSocket(connect(mapStateToProps, mapDispatchToProps)(GamePage));