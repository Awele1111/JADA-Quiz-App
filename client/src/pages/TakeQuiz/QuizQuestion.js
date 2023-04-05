import React from 'react';

const QuizQuestion = ({ quizData }) => {
    return (
        <main>
            <p>{questionNumber}: {quizData.questions[questionNumber-1]}</p>
            {quizData.questions[questionNumber-1].choices.map((choice) => {
                return (
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                        <label class="form-check-label" for="exampleRadios2">
                            {choice.choice}
                        </label>
                    </div>
                )
            })};
            <button>
                Next Question
            </button>
        </main>
    )
}

export default QuizQuestion;