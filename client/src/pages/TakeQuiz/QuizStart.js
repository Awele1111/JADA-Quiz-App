import React, { useState, useContext } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../../utils/mutations';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';


const QuizStart = ({ quizData, quizId, setQuestionNumber }) => {
    const [state, dispatch] = useQuizContext();
    const [favMessage, setFavMessage] = useState("");

    const [addFavorite, { favError }] = useMutation(ADD_FAVORITE);

    const handleQuizStart = (event) => {
        event.preventDefault();

        dispatch({ type: TOGGLE_TAKING_QUIZ})

        const startTime = new Date();
        localStorage.setItem("startTime", startTime.getTime());
        
        setQuestionNumber(1);
    }

    const handleAddFavorite = async () => {
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

    return (
        <div className="d-flex flex-column align-items-center p-4 mx-4">
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator.username}</h3>
            <h4>{quizData.description}</h4>
            {!Auth.loggedIn()?<a href='/login'>Log in to have your score recorded</a>:null}
            <button className="btn btn-primary w-25 m-1" onClick={handleQuizStart}>Start Quiz</button>
            <button type="button" className="btn btn-primary w-25 m-1" onClick={() => window.location.replace(`/highScores/${quizId}`)}>Highscores</button>
            {Auth.loggedIn()?<button type="button" className="btn btn-primary w-25 m-1" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
            <p className='fs-4'>{favMessage}</p>
        </div>
    )
}

export default QuizStart;