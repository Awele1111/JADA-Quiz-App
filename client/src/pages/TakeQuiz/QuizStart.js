import React, { useContext } from 'react';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';

const QuizStart = ({ quizData, setQuestionNumber }) => {
    const [state, dispatch] = useQuizContext();

    const handleQuizStart = (event) => {
        event.preventDefault();

        dispatch({ type: TOGGLE_TAKING_QUIZ})

        const startTime = new Date();
        localStorage.setItem("startTime", startTime.getTime());
        
        setQuestionNumber(1);
    }

    return (
        <div>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator.username}</h3>
            <p>{quizData.description}</p>
            <button onClick={handleQuizStart}>Start Quiz</button>
        </div>
    )
}

export default QuizStart;