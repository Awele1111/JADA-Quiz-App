import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../../utils/mutations';

const QuizScore = ({ quizData, quizId, score }) => {
    const timeTaken = localStorage.getItem("finishTime") - localStorage.getItem("startTime");

    const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

    const handleAddFavorite = async () => {
        try {
            await addFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleViewHighscores = () => {
        // render a list generated from quizData.highscores 
    }

    return (
        <div>
            <p>Quiz Finished! You scored {Math.round(100*score/quizData.questions.length)}% in {timeTaken/1000} seconds!</p>
            <button type="button" className="" onClick={() => window.location.reload()}>Try Again</button>
            <button type="button" className="" onClick={handleViewHighscores}>Highscores</button> {/* onClick render quizData.highscores array */}
            <button type="button" className="" onClick={() => window.location.replace('/')}>View Other Quizzes</button>
            {Auth.loggedIn()?<button type="button" className="" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
        </div>
    )
}

export default QuizScore;