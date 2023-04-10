import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { useQuizContext } from '../../utils/quizContext';
import { ADD_FAVORITE, ADD_ATTEMPT, REMOVE_FAVORITE } from '../../utils/mutations';

const QuizScore = ({ quizData, quizId, isFavorited, setIsFavorited, score, quizStyle }) => {
    const [attemptAdded, setAttemptAdded] = useState(false);
    const [favMessage, setFavMessage] = useState("");
    const [state, dispatch] = useQuizContext();
    
    const timeTaken = localStorage.getItem("finishTime") - localStorage.getItem("startTime") - state.pauseTime;

    const [addFavorite, { addFavError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { remFavError }] = useMutation(REMOVE_FAVORITE);
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
        setIsFavorited(!isFavorited)
        
        try {
            await addFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }

        setFavMessage("Added to favorites!")
        setTimeout(async function(){
            setFavMessage("");
        }, 1000)
    }

    const handleRemoveFavorite = async () => {
        setIsFavorited(!isFavorited)

        try {
            await removeFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }

        setFavMessage("Removed from favorites!")
        setTimeout(async function(){
            setFavMessage("");
        }, 1000)
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
                    <button type="button" className="btn btn-primary m-1" onClick={() => window.location.replace(`/highScores/${quizId}`)}>View Scoreboard</button>
                </div>
                <div className="card-footer text-muted d-flex justify-content-evenly flex-wrap">
                    <button type="button" className="btn btn-light m-1 myBtn" onClick={() => window.location.reload()}>Try Again</button>
                    <button type="button" className="btn btn-light m-1 myBtn" onClick={() => window.location.replace('/')}>View Other Quizzes</button>
                    {(Auth.loggedIn() && !isFavorited)?<button type="button" className="btn btn-light m-1 myBtn" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
                    {(Auth.loggedIn() && isFavorited)?<button type="button" className="btn btn-light m-1 myBtn" onClick={handleRemoveFavorite}>Remove from Favorites</button>:null}
                </div>
                <p>{favMessage}</p>
            </div>
        </div>
    )
}

export default QuizScore;