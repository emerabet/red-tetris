import { createStandardAction, getType, createAsyncAction } from "typesafe-actions";

export const START = createStandardAction("START")<void>();
export const END = createStandardAction("END")<void>();

export const START_SAGA = createStandardAction("START_SAGA")<void>();
export const END_SAGA = createStandardAction("END_SAGA")<void>();

export const startGame = () => {
    return {
        type: getType(START)
    }
}

export const endGame = () => {
    return {
        type: getType(END)
    }
}

export const startGameAsync = () => {
    return {
        type: getType(START_SAGA)
    }
}

export const endGameAsync = () => {
    return {
        type: getType(END_SAGA)
    }
}

//export const sayHello = createStandardAction("SayHello")<string>();
