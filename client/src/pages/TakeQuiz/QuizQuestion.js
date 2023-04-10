import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

import { useQuizContext } from '../../utils/quizContext';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';

const QuizQuestion = ({ quizData, quizId, questionNumber, setQuestionNumber, score, setScore, quizStyle }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerMessage, setAnswerMessage] = useState("");
    const [state, dispatch] = useQuizContext();


    const handleAnswerSubmit = async (event) => {
        event.preventDefault();

        if (selectedAnswer === null) {
            setAnswerMessage('You Must Select An Answer!')
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
        <div className='questionPageBody'>
            <div className='d-flex flex-column align-items-center p-4 mx-4'>        
                <div className="card text-center quizQuestionContainer" style={quizStyle}>
                    <div className="card-header">
                        <h2 className="card-title text-start m-3">Question {questionNumber}: {quizData.questions[questionNumber-1].question}</h2>
                    </div>
                    <div className="card-body quizInfoBody">
                        <div className='container'>
                            {quizData.questions[questionNumber-1].choices.map((choice, index) => {
                                return (
                                    <div className='row'>
                                        <div className="form-check mx-3 fs-4">
                                            {index===selectedAnswer?
                                                <input className="form-check-input col-1" onClick={() => {setSelectedAnswer(index)}} type="radio" name="choices" id={`choice${index}`} value={`choice${index}`} checked />:
                                                <input className="form-check-input" onClick={() => {setSelectedAnswer(index)}} type="radio" name="choices" id={`choice${index}`} value={`choice${index}`} />}
                                            <label className="form-check-label col-11 questionChoiceLabel" for={`choice${index}`}>
                                                {choice.choice}
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="card-footer d-flex flex-column align-items-center">
                        <button className='btn btn-primary m-3' onClick={handleAnswerSubmit}>Next Question</button>
                        <p className='fs-4'>{answerMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizQuestion;