import React, { useState } from 'react';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';

const TakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(0);

    const testQuiz = {
        title: "test2",
        questions: [
            {question: "question 1", choices: [{choice: "a", correct: true}, {choice: "b", correct:false}]}, 
            {question: "question 2", choices: [{choice: "a", correct: true}, {choice: "b", correct:false}]}],
        creator: "642c51f247f1c365f495ee71",
        description: ""
    }

    return (
        <main>
            {questionNumber===0?(
                <QuizStart quizData={testQuiz} setQuestionNumber={setQuestionNumber} />
            ):null}
            {questionNumber>testQuiz.questions.length?(
                <QuizScore quizData={testQuiz} />
            ):null}
            {questionNumber>0 && questionNumber <= testQuiz.questions.length?(
                <QuizQuestion quizData={testQuiz} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
            ):null}
        </main>
    )
}

export default TakeQuiz;