import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

import { useQuizContext } from '../../utils/quizContext';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';

const QuizQuestion = ({ quizData, quizId, questionNumber, setQuestionNumber, score, setScore }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerMessage, setAnswerMessage] = useState("");
    const [state, dispatch] = useQuizContext();


    const handleAnswerSubmit = async (event) => {
        event.preventDefault();

        if (selectedAnswer === null) {
            return; // tell player to pick an answer to continue?
        }

        if (quizData.questions[questionNumber-1].choices[selectedAnswer].correct) {
            setAnswerMessage("Correct!")
            setTimeout(async function(){
                setScore(score+1);
                setAnswerMessage("");
                setSelectedAnswer(null);
                if (questionNumber===quizData.questions.length && Auth.loggedIn) {
                    const finishTime = new Date();
                    localStorage.setItem("finishTime", finishTime.getTime());
                    dispatch({ type: TOGGLE_TAKING_QUIZ})
                }
                setQuestionNumber(questionNumber+1);
            }, 1000)
        } else {
            setAnswerMessage("Incorrect!")
            setTimeout(async function(){
                setAnswerMessage("");
                setSelectedAnswer(null);
                if (questionNumber===quizData.questions.length && Auth.loggedIn) {
                    const finishTime = new Date();
                    localStorage.setItem("finishTime", finishTime.getTime());
                    dispatch({ type: TOGGLE_TAKING_QUIZ})
                }
                setQuestionNumber(questionNumber+1);
            }, 1000)
        }
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
            {answerMessage}
        </div>
    )
}

export default QuizQuestion;