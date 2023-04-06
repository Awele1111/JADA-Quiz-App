import React from "react";
import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../../../utils/queries";
import trashLogo from '../../../assets/trashLogo.svg';
import editLogo from '../../../assets/editLogo.svg';

const MyQuizzes = ({ userId }) => {
    console.log(userId);

    const { loading, data } = useQuery(QUERY_QUIZZES, {
        variables: { creator: userId }
    });
    console.log(data);

    const handleDelete = (event) => {
        // let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to delete the quiz "${title}"? (This cannot be undone!)`)
    }

    const myQuizzes = data.myQuizzes;
    console.log(myQuizzes);
    return (
        <>
            <div className='container'>
                {myQuizzes.map((quiz, index) => (
                    <div className='row mb-4' key={index}>
                        <div className='col-4 col-sm-2 d-flex align-items-center justify-content-end p-0'>
                            <img src={trashLogo}
                                className='logo ps-3 pe-3'
                                alt='Trash Logo'
                                data-id={quiz._id}
                                data-title={quiz.title}
                                onClick={(event) => handleDelete(event)}>
                            </img>
                            <Link to={{ pathname: '/createQuiz', state: { quizData: quiz } }}>
                                <img src={editLogo}
                                    className='logo'
                                    alt='Edit Quiz Logo'
                                    data-id={quiz._id}
                                    data-title={quiz.title}>
                                </img>
                            </Link>
                        </div>
                        <div className='col'>
                            <h4 className='link-container text-start m-0'>
                                <a className='quizLink' onClick={() => console.log(`navigating to ${quiz.title}`)}>
                                    {quiz.title}
                                </a>
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyQuizzes;