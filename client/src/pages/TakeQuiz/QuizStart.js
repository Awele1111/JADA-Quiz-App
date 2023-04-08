import React, { useContext } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE } from '../../utils/mutations';
import { TOGGLE_TAKING_QUIZ } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';


const QuizStart = ({ quizData, quizId, setQuestionNumber }) => {
    const [state, dispatch] = useQuizContext();

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
    }

    return (
        <div>
            <h2>{quizData.title}</h2>
            <h3>by {quizData.creator.username}</h3>
            <p>{quizData.description}</p>
            {!Auth.loggedIn()?<a href='/login'>Log in to have your score recorded</a>:null}
            <button onClick={handleQuizStart}>Start Quiz</button>
            <button type="button" className="" onClick={() => window.location.replace(`/highScores/${quizId}`)}>Highscores</button>
            {Auth.loggedIn()?<button type="button" className="" onClick={handleAddFavorite}>Save Quiz to Favorites</button>:null}
        </div>
    )
}

export default QuizStart;