import React, { createContext, useContext } from 'react';
import { useQuizReducer } from './reducers';

//global context variable that tracks if the user is taking a quiz since multiple components need to rerender when this changes
//also tracks how much time the user has paused the quiz to subtract that from their total time
const QuizContext = createContext();
const { Provider } = QuizContext;

export default function QuizProvider({ value = [], ...props }) {
  const [state, dispatch] = useQuizReducer({ takingQuiz: false, pauseTime: 0});
  return <Provider value={ [state, dispatch] } {...props} />;
}

const useQuizContext = () => useContext(QuizContext);

export { QuizProvider, useQuizContext };