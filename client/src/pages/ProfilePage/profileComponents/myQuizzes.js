import React from "react";
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_QUIZZES } from "../../../utils/queries";
import trashLogo from '../../../assets/trashLogo.svg';
import editLogo from '../../../assets/editLogo.svg';
import { DELETE_QUIZ } from "../../../utils/mutations";

const MyQuizzes = ({ userId }) => {
 
    const { loading, data } = useQuery(QUERY_QUIZZES, {
        variables: { creator: userId }
    });

    const [deleteQuiz, { error, deleteData }] = useMutation(DELETE_QUIZ);

    const handleDelete = async (event) => {
        let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to delete the quiz "${title}"? (This cannot be undone!)`)
        try {
            const { deleteData } = await deleteQuiz({
                variables: { quizId: _id }
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    

    const myQuizzes = data?.myQuizzes || [];

    if (!myQuizzes.length) {
        return <h3>No Quizzes Created</h3>
        
    }

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
                            <a href={`/createQuiz/${quiz._id}`}>
                                <img src={editLogo}
                                    className='logo'
                                    alt='Edit Quiz Logo'
                                    data-id={quiz._id}
                                    data-title={quiz.title}>
                                </img>
                            </a>
                        </div>
                        <div className='col'>
                            <h4 className='link-container text-start m-0'>
                                <a className='quizLink' href={`/takeQuiz/${quiz._id}`}>
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