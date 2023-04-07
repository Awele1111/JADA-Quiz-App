import React, { useContext } from 'react';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';

const QuizStart = ({ quizData, setQuestionNumber }) => {
    const [state, dispatch] = useQuizContext();
    
    const startQuiz = () => {
        dispatch({ type: TOGGLE_TAKING_QUIZ})
        setQuestionNumber(1);
    }

    return (
        <div>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator.username}</h3>
            <p>{quizData.description}</p>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}

export default QuizStart;