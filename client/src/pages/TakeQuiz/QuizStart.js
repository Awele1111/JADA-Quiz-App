import React from 'react';

const QuizStart = ({ quizData, setQuestionNumber }) => {
    const handleQuizStart = (event) => {
        event.preventDefault();

        setQuestionNumber(1);

        const startTime = new Date();
        localStorage.setItem("startTime", startTime.getTime());
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