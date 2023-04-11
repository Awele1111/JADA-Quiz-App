// imports
import React, { useState, useContext } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../utils/mutations';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';


const QuizStart = ({ quizData, quizId, isFavorited, setIsFavorited, setQuestionNumber, quizStyle}) => {
    // set up states, mutations, context
    const [state, dispatch] = useQuizContext();
    const [favMessage, setFavMessage] = useState("");

    const [addFavorite, { addFavError }] = useMutation(ADD_FAVORITE);
    const [removeFavorite, { remFavError }] = useMutation(REMOVE_FAVORITE);

    // handler for 'start quiz' button; toggles context, saves a start time, sets "question number" state to 1
    const handleQuizStart = (event) => {
        event.preventDefault();

        dispatch({ type: TOGGLE_TAKING_QUIZ})

        const startTime = new Date();
        localStorage.setItem("startTime", startTime.getTime());
        
        setQuestionNumber(1);
    }

    // handler for 'add to favorites' button; toggles 'isFavorited' state to true, attempts to add quiz to user's favorites, and display a message for 1 second indicating success
    const handleAddFavorite = async () => {
        setIsFavorited(!isFavorited)

        try {
            await addFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }
        
        setFavMessage("Added to favorites!")
        setTimeout(async function(){
            setFavMessage("");
        }, 1000)
    }

    // handler for 'remove from favorites' button; toggles 'isFavorited' state to false, attempts to remove quiz from user's favorites, and display a message for 1 second indicating success
    const handleRemoveFavorite = async () => {
        setIsFavorited(!isFavorited);

        try {
            await removeFavorite({
                variables: { quizId: quizId },
            });
        } catch (err) {
            console.error(err);
        }

        setFavMessage("Removed from favorites!")
        setTimeout(async function(){
            setFavMessage("");
        }, 1000)
    }

    // html and bootstrap for quizStart component, including some information on the quiz and buttons to start quiz, view highscores, and (if logged in) add to/remove from user's favorites
    return (
        <div className="d-flex flex-column align-items-center p-4 mx-4">
            <div className="card text-center quizStartContainer" style={quizStyle}>
                <div className="card-header">
                    <h2 className="card-title">{quizData.title}</h2>
                    <h5>Created by {quizData.creator.username}</h5>
                </div>
                <div className="card-body quizInfoBody">
                    <h5 className="card-text mb-5">{quizData.description}</h5>
                    <button className="btn btn-primary m-4" onClick={handleQuizStart}>Start Quiz</button>
                </div>
                    {!Auth.loggedIn()?(
                        <div className="card-body d-flex flex-column align-items-center">
                            <h6 className="mb-2">Log in before you start if you want your score saved!</h6>
                            <button className='btn btn-primary' onClick={() => window.location.assign('/login')}>Login</button>
                        </div>
                        ):null
                    }
                <div className="d-flex justify-content-evenly flex-wrap">
                    <button type="button" className="btn btn-light m-1 myBtn" onClick={() => window.location.replace(`/highScores/${quizId}`)}>Highscores</button>
                    {(Auth.loggedIn() && !isFavorited)?<button type="button" className="btn btn-light m-1 myBtn" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
                    {(Auth.loggedIn() && isFavorited)?<button type="button" className="btn btn-light m-1 myBtn" onClick={handleRemoveFavorite}>Remove from Favorites</button>:null}
                </div>
                <p>{favMessage}</p>
            </div>
        </div>
    )
}

// export component to use in TakeQuiz.js
export default QuizStart;