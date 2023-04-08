import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ } from '../../utils/queries';

const TakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_QUIZ, {
        variables: { id: id },
    });

    const quizData = data?.quiz || null;

    return (
        <main className='min-vh-100'>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    {questionNumber===0?(
                        <QuizStart quizData={quizData} quizId={id} setQuestionNumber={setQuestionNumber} />
                    ):null}
                    {questionNumber>0 && questionNumber<=quizData.questions.length?(
                        <QuizQuestion quizData={quizData} quizId={id} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} score={score} setScore={setScore} />
                    ):null}
                    {questionNumber>quizData.questions.length?(
                        <QuizScore quizData={quizData} quizId={id} score={score} />
                    ):null}
                </div>
            )}
        </main>
    )
}

export default TakeQuiz;