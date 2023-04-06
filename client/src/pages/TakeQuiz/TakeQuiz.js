import React, { useState } from 'react';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ } from '../../utils/queries';

const TakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);

    // QUERY_QUIZ by id rather than using testQuiz
    const testQuiz = {
        title: "test2",
        questions: [
            {question: "question 1", choices: [{choice: "a", correct: true}, {choice: "b", correct:false}]}, 
            {question: "question 2", choices: [{choice: "a", correct: true}, {choice: "b", correct:false}]}],
        creator: "allison",
        description: "test description"
    }

    return (
        <main>
            {questionNumber===0?(
                <QuizStart quizData={testQuiz} setQuestionNumber={setQuestionNumber} />
            ):null}
            {questionNumber>0 && questionNumber<=testQuiz.questions.length?(
                <QuizQuestion quizData={testQuiz} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} score={score} setScore={setScore} />
            ):null}
            {questionNumber>testQuiz.questions.length?(
                <QuizScore quizData={testQuiz} score={score} />
            ):null}
        </main>
    )
}

export default TakeQuiz;