import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import withSocket from '../../Hoc/SocketHoc';
import Socket from 'socket.io-client';
import { startGameAsync, endGameAsync, rotateAsync, moveDownAsync } from '../../actions/gameActions';
import { getType } from 'typesafe-actions';
import { GameStore, position } from '../../types/gameTypes';

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
    startGame: Function,
    endGame: Function,
    rotate: Function,
    moveDown: Function,
}

interface GamePageState {
    room: string,
    player: string,
}

class GamePage extends Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps) {
        super(props);
        this.state = {
            room: "",
            player: "",
        };

        this.play = this.play.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.end = this.end.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.rotate = this.rotate.bind(this);
        this.moveDown = this.moveDown.bind(this);
    }

    componentDidMount() {
        console.log(window.location.hash)
    }

    play(event: any) {
        event.preventDefault();
        this.props.startGame(this.state.room, this.state.player);
        this.props.history.push(`/#${this.props.room}[${this.props.player}]`);
    }

    end() {
        this.props.endGame();
    }

    handleChange(event: any) {
        // this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === "room") {
            this.setState({ room: event.target.value });
        } else if (event.target.name = "player") {
            this.setState({ player: event.target.value });
        }
    }

    renderBoard() {
        let i = 0;
        let j = 0;
        return (
            <div className="board">
                {this.props.board.map((d) => {
                    return (
                        <div key={i++} className="boardRow">
                            {
                                d.map((c) => {
                                    return (
                                        <div key={j++} className="boardCell">{c}</div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }

    rotate() {
        this.props.rotate(this.props.pieceIndex);
    }

    moveDown() {
        this.props.moveDown(this.props.position.x, this.props.position.y);
    }

    render() {
        return (
            <div>
                test Game page {this.props.started && "started"} ad {this.props.room} {this.props.player}
                <div className="mainDiv">
                    <form onSubmit={this.play}>
                        <input name="room" type="text" placeholder="room" onChange={this.handleChange}></input>
                        <input name="player" type="text" placeholder="player" onChange={this.handleChange}></input>
                        <button type="submit" disabled={this.state.room === "" || this.state.player === ""}> Play </button>
                    </form>
                    <button onClick={this.end}> END </button>
                    <div>
                        {this.props.piece}
                    </div>
                    <div>
                        {this.props.piece[this.props.pieceIndex]}
                    </div>
                    <div>
                        x:{this.props.position.x}/y:{this.props.position.y}
                    </div>
                    {this.renderBoard()}
                    <button onClick={this.rotate}>UP</button>
                    <button onClick={this.moveDown}>DOWN</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: GameStore) {
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
        startGame: (room: string, player: string) => dispatch(startGameAsync({ room: room, player: player })),
        endGame: () => dispatch(endGameAsync()),
        rotate: (pieceIndex: number) => dispatch(rotateAsync({ pieceIndex: pieceIndex })),
        moveDown: (x: number, y: number) => dispatch(moveDownAsync({ position: { x: x, y: y } })),
    }
}

export default withSocket(connect(mapStateToProps, mapDispatchToProps)(GamePage));