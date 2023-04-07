import { useReducer } from 'react'; 
import { TOGGLE_TAKING_QUIZ, ADD_TO_PAUSE_TIME, RESET_PAUSE_TIME } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_TAKING_QUIZ: {
            let newTakingQuiz = !state.takingQuiz
            return {
                ...state,
                takingQuiz: newTakingQuiz
            };
        }
        case ADD_TO_PAUSE_TIME: {
            let totalTimePaused = state.pauseTime += action.payload;
            return {
                ...state,
                pauseTime: totalTimePaused
            }
        }
        case RESET_PAUSE_TIME: {
            return {
                ...state,
                pauseTime: 0
            }
        }
        default:
            return state;
    }
};

export function useQuizReducer(initialState) {
    return useReducer(reducer, initialState);
}
