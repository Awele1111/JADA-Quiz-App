import React, { useState } from 'react';

const QuizScore = ({ quizData, score }) => {
    console.log(score);
    return (
        <div>
            <p>Quiz Finished! You scored {score}</p>
            <button type="button" className="btn btn-primary btn-lg">Try Again</button> {/* onClick refresh page? */}
            <button type="button" className="btn btn-primary btn-lg">Highscores</button> {/* onClick render quizData.highscores array */}
            <button type="button" className="btn btn-primary btn-lg">View Other Quizzes</button> {/* onClick go to Home page? */}
            <button type="button" className="btn btn-primary btn-lg">Save Quiz to Favorites</button> {/* onClick add quizId to user.favoriteQuizzes array */}
        </div>
    )
}

export default QuizScore;