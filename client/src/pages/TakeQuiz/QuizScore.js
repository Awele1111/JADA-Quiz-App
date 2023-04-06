import React, { useState } from 'react';

const QuizScore = ({ quizData, score }) => {
    return (
        <div>
            <p>Quiz Finished! You scored {100*score/quizData.questions.length}%</p>
            <button type="button" className="">Try Again</button> {/* onClick refresh page? */}
            <button type="button" className="">Highscores</button> {/* onClick render quizData.highscores array */}
            <button type="button" className="">View Other Quizzes</button> {/* onClick go to Home page? */}
            <button type="button" className="">Save Quiz to Favorites</button> {/* onClick add quizId to user.favoriteQuizzes array */}
        </div>
    )
}

export default QuizScore;