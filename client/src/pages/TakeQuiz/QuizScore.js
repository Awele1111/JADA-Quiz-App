import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { useQuizContext } from '../../utils/quizContext';
import { ADD_FAVORITE, ADD_ATTEMPT } from '../../utils/mutations';

const QuizScore = ({ quizData, quizId, score, quizStyle }) => {
    const [attemptAdded, setAttemptAdded] = useState(false);
    const [state, dispatch] = useQuizContext();
    
    const timeTaken = localStorage.getItem("finishTime") - localStorage.getItem("startTime") - state.pauseTime;

    const [addFavorite, { favError }] = useMutation(ADD_FAVORITE);
    const [addAttempt, attemptMutation] = useMutation(ADD_ATTEMPT);
    
    if(!attemptAdded && Auth.loggedIn()) {
        setAttemptAdded(true);
        try {
            addAttempt({
                variables: { quizId: quizId, score: Math.round(100*score/quizData.questions.length), time: timeTaken/1000 },
            });
        } catch (err) {
            console.error(err);
        }
    }

    if(attemptMutation.loading){
        return <>Loading...</>
    }

    const handleAddFavorite = async () => {
        try {
            await addFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='d-flex flex-column align-items-center p-4 mx-4'>    
            <div className="card text-center quizFinishedContainer" style={quizStyle}>
                <div class="card-header">
                    <h2 className="card-title">Quiz Finished!</h2>
                    <h5>You scored {Math.round(100*score/quizData.questions.length)}% in {timeTaken/1000} seconds!</h5>
                </div>
                <div className="card-body quizInfoBody">
                    {Auth.loggedIn() ? (
                        <p className="card-text">{attemptMutation.data?.addAttempt.message}</p>
                    ):(
                        <p className="card-text">Your score will not be saved since you are not logged in</p>
                    )}
                    <button type="button" className="btn btn-primary w-25 m-1" onClick={() => window.location.replace(`/highScores/${quizId}`)}>View Scoreboard</button>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary w-25 m-1" onClick={() => window.location.reload()}>Try Again</button>
                    <button type="button" className="btn btn-secondary w-25 m-1" onClick={() => window.location.replace('/')}>View Other Quizzes</button>
                    {Auth.loggedIn()?<button type="button" className="btn btn-secondary w-25 m-1" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
                </div>
            </div>
        </div>
    )
}

export default QuizScore;