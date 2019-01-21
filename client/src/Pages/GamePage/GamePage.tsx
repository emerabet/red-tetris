import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import withSocket from '../../Hoc/SocketHoc';
import { startGameAsync, endGameAsync, startGame, endGame, END_SAGA } from './actions';
import { getType } from 'typesafe-actions';
import { GameStore } from './types';

interface GamePageProps {
    nagivation: any,
    socket: any,
    match: any,
    started: boolean,
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
    }

    componentDidMount() {
        console.log(window.location.hash)
        console.log("STARTED", this.props.started)
        console.log("TYPE", getType(END_SAGA))
    }

    play(event: any) {
        event.preventDefault();
        console.log(this.state);
        this.props.startGame();
        console.log("STARTED", this.props.started);
    }

    end = () => {
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

    render() {
        return (
            <div>
                test Game page {this.props.started && "started"} ad
                <header className="App-header">
                    <form onSubmit={this.play}>
                        <input name="room" type="text" placeholder="room" onChange={this.handleChange}></input>
                        <input name="player" type="text" placeholder="player" onChange={this.handleChange}></input>
                        <button type="submit" disabled={this.state.room === "" || this.state.player === ""}> Play </button>
                    </form>
                    <button onClick={this.end}> END </button>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state: GameStore) {
    return {
        started: state.game.started,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        startGame: () => dispatch(startGameAsync()),
        endGame: () => dispatch(endGameAsync()),
    }
}

export default withSocket(connect(mapStateToProps, mapDispatchToProps)(GamePage));