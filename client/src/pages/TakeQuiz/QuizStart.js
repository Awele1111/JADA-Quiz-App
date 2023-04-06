import React from 'react';

const QuizStart = ({ quizData, setQuestionNumber }) => {
    return (
        <div>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator}</h3>
            <p>{quizData.description}</p>
            <button onClick={() => setQuestionNumber(1)}>Start Quiz</button>
        </div>
    )
}

export default QuizStart;