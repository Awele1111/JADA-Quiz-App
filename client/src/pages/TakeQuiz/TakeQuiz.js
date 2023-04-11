// imports
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';
import { useQuery } from '@apollo/client';
import { QUERY_QUIZ, QUERY_ME } from '../../utils/queries';
import './TakeQuiz.css';

const TakeQuiz = () => {
    // initialize all states, pull quiz id from params, attempt me/quiz queries
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const user = useQuery(QUERY_ME);
    const { loading, data } = useQuery(QUERY_QUIZ, {
        variables: { id: id },
    });

    // if user is still loading, return a "loading screen"
    if(user.loading){
        return <div>Loading...</div>
    }

    // pull logged in user's favorite quizzes array (or set it as an empty array if user isn't logged in or is otherwise missing that array)
    const userFavs = user.data?.me.favoriteQuizzes || [];

    // check favorited quizzes to see if the current quiz is there, and store that boolean for use below 
    let boolFav = userFavs.some(element => {
        if (element._id === id) {
            return true;
        }
    })

    // executes only the first time the virtual dom makes it through the above code, particularly the 'me' query
    // saves value of above boolFav into 'isFavorited' state
    if(!loaded){
        setLoaded(true);
        setIsFavorited(boolFav);
    }

    // saves quizData from quiz query, or returns null
    const quizData = data?.quiz || null;

    // if there's no quizData, display a "quiz not found" page
    if(!quizData){
        return (
            <div>
                <h1>Quiz Cannot Be Found! It must have been deleted!</h1>
            </div>
        )
    }    

    // sets the styling for each child component's container to a simple style that just adjusts the background color and the text color if needed
    let quizStyle;
    switch(quizData.style){
        case 'black':
            quizStyle = {
                color: '#ffffff',
                backgroundColor: '#212529'
            }; 
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

    // TakeQuiz parent element; conditionally renders children elements based on where user is in the process of taking a quiz (start page -> question pages -> score page)
    // passes required states into these children elements
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

//export for use in App.js
export default TakeQuiz;