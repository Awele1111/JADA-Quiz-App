import React from 'react';
import { QUERY_USER } from '../../utils/queries';

const QuizStart = ({ quizData, setQuestionNumber }) => {
    return (
        <main>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator}</h3>
            <p>{quizData.description}</p>
            <button onClick={setQuestionNumber(1)}>Start Quiz</button>
        </main>
    )
}

export default QuizStart;