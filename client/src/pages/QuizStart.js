import React, { useState } from 'react'


const QuizStart = ({quizData}) => {
    return (
        <main>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.author}</h3>
            
        </main>
    )
}

export default QuizStart;