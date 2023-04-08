import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_QUIZZES } from "../../../utils/queries";
import trashLogo from '../../../assets/trashLogo.svg';
import editLogo from '../../../assets/editLogo.svg';
import { DELETE_QUIZ } from "../../../utils/mutations";
import { Modal } from 'bootstrap'

const MyQuizzes = ({ userId }) => {
    const [deleteInfo, setDeleteInfo] = useState({_id: '', title: ''});
    const [quizList, setQuizList] = useState();
    const [deleteQuiz, quizMutation ] = useMutation(DELETE_QUIZ);
    const quizQuery = useQuery(QUERY_QUIZZES, {
        variables: { creator: userId }
    });
    
    if (quizQuery.loading || quizMutation.loading) {
        return <div>Loading...</div>
    }

    let myQuizzes;
    if(quizMutation.called){
        myQuizzes = quizMutation.data?.deleteQuiz || [];
    } else{
        myQuizzes = quizQuery.data?.myQuizzes || [];
    }

    if (!myQuizzes.length) {
        return <h3>No Quizzes Created</h3>
    }


    const handleDelete = async () => {
       try {
            await deleteQuiz({
                variables: { quizId: deleteInfo._id }
            });
        } catch (err) {
            console.error(err);
        }
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
                                data-bs-toggle="modal" 
                                data-bs-target="#deleteModal"
                                onClick={() => setDeleteInfo({ _id: quiz._id, title: quiz.title })}>
                            </img>
                            <a href={`/createQuiz/${quiz._id}`}>
                                <img src={editLogo}
                                    className='logo'
                                    alt='Edit Quiz Logo'>
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
            <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Quiz</h1>
                    </div>
					<div className="modal-footer d-flex justify-content-center">
						<p>Are you sure you want to delete the quiz "{deleteInfo.title}"?</p>
                        <p>THIS CANNOT BE UNDONE!!!</p>
					</div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(event) => handleDelete(event)}>Delete Quiz</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyQuizzes;