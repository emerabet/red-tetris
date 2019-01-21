import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import withSocket from '../../Hoc/SocketHoc';
import { startGameAsync, endGameAsync, startGame, endGame, END_SAGA } from '../../actions/gameActions';
import { getType } from 'typesafe-actions';
import { GameStore } from '../../types/gameTypes';

import './style.css';

interface GamePageProps {
    nagivation: any,
    history: any,
    socket: any,
    match: any,
    started: boolean,
    room: string,
    player: string,
    board: number[][],
    startGame: Function,
    endGame: Function,
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
    }

    componentDidMount() {
        console.log(window.location.hash)
        console.log("STARTED", this.props.started)
        console.log("TYPE", getType(END_SAGA))
    }

    play(event: any) {
        event.preventDefault();
        console.log(this.state);
        this.props.startGame(this.state.room, this.state.player);
        console.log("STARTED", this.props.started);
        this.props.history.push(`/#${this.props.room}[${this.props.player}]`);
    }

    end() {
        this.props.endGame();
        console.log("STARTED END?", this.props.started);
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
        return (
            <div className="board">
                {this.props.board.map((d) => {
                    return (
                        <div className="boardRow">
                            {
                                d.map((c) => {
                                    return (
                                        <div className="boardCell">{c}</div>
                                    )
                                })
                            }
                        </div>
                    )
                })}


            </div>
        )
    }

    render() {
        return (
            <div>
                test Game page {this.props.started && "started"} ad {this.props.room} {this.props.player}
                <body>
                    <form onSubmit={this.play}>
                        <input name="room" type="text" placeholder="room" onChange={this.handleChange}></input>
                        <input name="player" type="text" placeholder="player" onChange={this.handleChange}></input>
                        <button type="submit" disabled={this.state.room === "" || this.state.player === ""}> Play </button>
                    </form>
                    <button onClick={this.end}> END </button>
                    {this.renderBoard()}
                </body>
            </div>
        )
    }
}

function mapStateToProps(state: GameStore) {
    return {
        started: state.game.started,
        room: state.game.room,
        player: state.game.player,
        board: state.game.board
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        startGame: (room: string, player: string) => dispatch(startGameAsync({ room: room, player: player })),
        endGame: () => dispatch(endGameAsync()),
    }
}

export default withSocket(connect(mapStateToProps, mapDispatchToProps)(GamePage));