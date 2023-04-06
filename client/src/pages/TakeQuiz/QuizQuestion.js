import React from 'react';

const QuizQuestion = ({ quizData, questionNumber, setQuestionNumber }) => {
    return (
        <main>
            <p>{questionNumber+1}: {quizData.questions[questionNumber].question}</p>
            {quizData.questions[questionNumber].choices.map((choice) => {
                return (
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                        <label class="form-check-label" for="exampleRadios2">
                            {choice.choice}
                        </label>
                    </div>
                )
            })}
            <button onClick={() => setQuestionNumber(questionNumber++)}>Next Question</button>
        </main>
    )
}

export default QuizQuestion;