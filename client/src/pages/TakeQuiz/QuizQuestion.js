import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_ATTEMPT } from '../../utils/mutations';

const QuizQuestion = ({ quizData, questionNumber, setQuestionNumber, score, setScore }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [addAttempt, { error }] = useMutation(ADD_ATTEMPT);

    const handleAnswerSubmit = async (event) => {
        event.preventDefault();

        if (selectedAnswer === null) {
            return; // tell player to pick an answer to continue?
        }

        if (quizData.questions[questionNumber-1].choices[selectedAnswer].correct) {
            setScore(score+1);
        }

        if (questionNumber===quizData.questions.length && Auth.loggedIn) { // && logged in
            try {
                await addAttempt({
                    variables: { quizId: quizData._id, score: score },
                });
            } catch (err) {
                console.error(err);
            }
        }

        setSelectedAnswer(null);
        setQuestionNumber(questionNumber+1);
    }

    return (
        <div>
            <p>{questionNumber}: {quizData.questions[questionNumber-1].question}</p>
            {quizData.questions[questionNumber-1].choices.map((choice, index) => {
                return (
                    <div className="form-check">
                        {index===selectedAnswer?
                            <input className="form-check-input" onClick={() => {setSelectedAnswer(index)}} type="radio" name="choices" id={`choice${index}`} value={`choice${index}`} checked />:
                            <input className="form-check-input" onClick={() => {setSelectedAnswer(index)}} type="radio" name="choices" id={`choice${index}`} value={`choice${index}`} />}
                        <label className="form-check-label" for={`choice${index}`}>
                            {choice.choice}
                        </label>
                    </div>
                )
            })}
            <button onClick={handleAnswerSubmit}>Next Question</button>
        </div>
    )
}

export default QuizQuestion;