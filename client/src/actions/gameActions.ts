import { createStandardAction, getType, createAsyncAction } from "typesafe-actions";

export const START = createStandardAction("START")<void>();
export const END = createStandardAction("END")<void>();

export const START_SAGA = createStandardAction("START_SAGA")<void>();
export const END_SAGA = createStandardAction("END_SAGA")<void>();

export const startGame = (room: String, player: String, board: number[][]) => {
    return {
        type: getType(START),
        payload: {
            room: room,
            player: player,
            board: board
        }
    }
}

export const endGame = () => {
    return {
        type: getType(END)
    }
}

interface StartArgs {
    room: string,
    player: string
}

export const startGameAsync = (payloads: StartArgs) => {
    console.log("SSS", payloads)
    return {
        type: getType(START_SAGA),
        ...payloads
    }
}

export const endGameAsync = () => {
    return {
        type: getType(END_SAGA)
    }
}

//export const sayHello = createStandardAction("SayHello")<string>();
