import React from 'react';
import { Link } from 'react-router-dom';

const QuizStart = ({quizData}) => {
    return (
        <main>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.author}</h3>
            <p>{quizData.description}</p>
            <Link to="">
                <button>
                    Start Quiz
                </button>
            </Link>
        </main>
    )
}

export default QuizStart;