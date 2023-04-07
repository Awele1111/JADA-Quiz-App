import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE, ADD_ATTEMPT } from '../../utils/mutations';
import HighScores from './HighScore';

const QuizScore = ({ quizData, quizId, score }) => {
    const [addFavorite, { error }] = useMutation(ADD_FAVORITE);
    console.log(quizData);
    const handleAddFavorite = async () => {
        try {
            await addFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }
    }

    // const handleViewHighscores = () => {
    //     return( 
    //     <>
    //     <div>Hello</div>
    //     <HighScores score={score} quizId={quizId} quizData={quizData}/>
    //     </>
    //     )
    //     // render a list generated from quizData.highscores 
    // }

    return (
        <div>
            <p>Quiz Finished! You scored {100*score/quizData.questions.length}%!</p>
            <button type="button" className="" onClick={() => window.location.reload()}>Try Again</button>
            <button type="button" className=""><a href={`/highScores/${quizId}`}>Highscores</a></button> {/* onClick render quizData.highscores array */}
            <button type="button" className="" onClick={() => window.location.replace('/')}>View Other Quizzes</button>
            {Auth.loggedIn()?<button type="button" className="" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
        </div>
    )
}

export default QuizScore;