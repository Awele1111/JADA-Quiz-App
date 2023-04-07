import React, { createContext, useContext } from 'react';
import { useQuizReducer } from './reducers';


const QuizContext = createContext();
const { Provider } = QuizContext;


export default function QuizProvider({ value = [], ...props }) {
  const [state, dispatch] = useQuizReducer({ takingQuiz: false, pauseTime: 0});
  return <Provider value={ [state, dispatch] } {...props} />;
}

const useQuizContext = () => useContext(QuizContext);

export { QuizProvider, useQuizContext };