import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ, QUERY_ME } from '../../utils/queries';
import './TakeQuiz.css';

const TakeQuiz = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const user = useQuery(QUERY_ME);
    const { loading, data } = useQuery(QUERY_QUIZ, {
        variables: { id: id },
    });

    if(user.loading){
        return <div>Loading...</div>
    }

    const userFavs = user.data?.me.favoriteQuizzes || [];
    let boolFav = userFavs.some(element => {
        if (element._id === id) {
            return true;
        }
    })

    if(!loaded){
        setLoaded(true);
        setIsFavorited(boolFav);
    }

    const quizData = data?.quiz || null;

    if(!quizData){
        return (
            <div>
                <h1>Quiz Cannot Be Found! It must have been deleted!</h1>
            </div>
        )
    }    

    let quizStyle;
    switch(quizData.style){
        case 'black':
            quizStyle = {
                color: '#ffffff',
                backgroundColor: '#212529'
            }; //done
            break
        case 'brown':
            quizStyle = {
                color: '#ffffff',
                backgroundColor: '#62370c'
            };
            break
        case 'green':
            quizStyle = {
                backgroundColor: '#1f9b1f'
            };
            break
        case 'red':
            quizStyle = {
                color: '#ffffff',
                backgroundColor: '#930606'
            };
            break
        case 'yellow':
            quizStyle = {
                backgroundColor: '#e8ce1f'
            };
            break
        case 'orange':
            quizStyle = {
                backgroundColor: 'rgb(229 97 48)'
            };
            break
        case 'pink':
            quizStyle = {
                backgroundColor: 'rgb(246 91 178)'
            };
            break
        default:
            quizStyle = {
                backgroundColor: '#b534bc70'
            };
            break
    }

    return (
        <main>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    {questionNumber===0?(
                        <QuizStart quizData={quizData} quizId={id} isFavorited={isFavorited} setIsFavorited={setIsFavorited} setQuestionNumber={setQuestionNumber} quizStyle={quizStyle}/>
                    ):null}
                    {questionNumber>0 && questionNumber<=quizData.questions.length?(
                        <QuizQuestion quizData={quizData} quizId={id} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} score={score} setScore={setScore} quizStyle={quizStyle}/>
                    ):null}
                    {questionNumber>quizData.questions.length?(
                        <QuizScore quizData={quizData} quizId={id} isFavorited={isFavorited} setIsFavorited={setIsFavorited} score={score} quizStyle={quizStyle}/>
                    ):null}
                </div>
            )}
        </main>
    )
}

export default TakeQuiz;