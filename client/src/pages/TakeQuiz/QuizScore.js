import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { useQuizContext } from '../../utils/quizContext';
import { ADD_FAVORITE, ADD_ATTEMPT } from '../../utils/mutations';

const QuizScore = ({ quizData, quizId, score }) => {
    const [attemptAdded, setAttemptAdded] = useState(false);
    const [state, dispatch] = useQuizContext();
    
    const timeTaken = localStorage.getItem("finishTime") - localStorage.getItem("startTime") - state.pauseTime;

    const [addFavorite, { favError }] = useMutation(ADD_FAVORITE);
    const [addAttempt, { attemptError }] = useMutation(ADD_ATTEMPT);
    
    
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
            <h2>Quiz Finished!</h2>        
            <h4>You scored {Math.round(100*score/quizData.questions.length)}% in {timeTaken/1000} seconds!</h4>
            <button type="button" className="btn btn-primary w-25 m-1" onClick={() => window.location.reload()}>Try Again</button>
            <button type="button" className="btn btn-primary w-25 m-1" onClick={() => window.location.replace(`/highScores/${quizId}`)}>Highscores</button>
            <button type="button" className="btn btn-primary w-25 m-1" onClick={() => window.location.replace('/')}>View Other Quizzes</button>
            {Auth.loggedIn()?<button type="button" className="btn btn-primary w-25 m-1" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
        </div>
    )
}

export default QuizScore;