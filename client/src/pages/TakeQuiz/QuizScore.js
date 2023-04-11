// imports
import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { useQuizContext } from '../../utils/quizContext';
import { ADD_FAVORITE, ADD_ATTEMPT, REMOVE_FAVORITE } from '../../utils/mutations';

const QuizScore = ({ quizData, quizId, isFavorited, setIsFavorited, score, quizStyle }) => {
    // new states, context
    const [attemptAdded, setAttemptAdded] = useState(false);
    const [favMessage, setFavMessage] = useState("");
    const [state] = useQuizContext();
    
    // calculate how much total time the user spent on the quiz
    const timeTaken = localStorage.getItem("finishTime") - localStorage.getItem("startTime") - state.pauseTime;

    // mutations
    const [addFavorite, { addFavError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { remFavError }] = useMutation(REMOVE_FAVORITE);

    const [addAttempt, attemptMutation] = useMutation(ADD_ATTEMPT);
    
    // adds attempt to high scores for this quiz
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

    // if still adding attempt, display simple 'loading' page
    if(attemptMutation.loading){
        return <>Loading...</>
    }

    // handler for adding favorite; see quizStart
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

    // handler for removing favorite; see quizStart
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

    // html and bootstrap for QuizScore component, including user's score and time, and buttons to view high scores, try again, view other quizzes, and add to/remove from user's favorites
    return (
        <div className='d-flex flex-column align-items-center p-4 mx-4'>    
            <div className="card text-center quizFinishedContainer" style={quizStyle}>
                <div className="card-header">
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
                <div className="d-flex justify-content-evenly flex-wrap">
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

// export component to use in TakeQuiz.js
export default QuizScore;