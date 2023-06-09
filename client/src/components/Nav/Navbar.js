import './navbar.css';
import React, { useState, useReducer } from 'react';
import { Modal } from 'bootstrap';

import AuthService from '../../utils/auth';
import { ADD_TO_PAUSE_TIME } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';


const Nav = () => {
    //global context to track if user has started a quiz and to update the pausetime if the user pauses a quiz
    const [state, dispatch] = useQuizContext();
    //state that tracks the time at which the user pauses a quiz to calculate the total amount of time pauses
    //total paused time is the dispacted and added to the global context and then subtracted from time taken to complete the quiz
    const [startPauseTime, setStartPauseTime] = useState(0);

    const pauseTime = () => {
        setStartPauseTime(Date.now());
    }

    const resumeTime = () => {
        let totalTimePaused = Date.now() - startPauseTime;
        dispatch({ type: ADD_TO_PAUSE_TIME, payload: totalTimePaused});
    }

    //this ensures that the toggling between modals functions properly since they are not always the same instance of the modal
    const toggleModal = (modalNum) => {
        var pauseQuizModalEl = document.querySelector('#pauseQuizModal');
        var pauseQuizModal = Modal.getOrCreateInstance(pauseQuizModalEl);
        var confirmExitModalEl = document.querySelector('#confirmExitModal');
        var confirmExitModal = Modal.getOrCreateInstance(confirmExitModalEl);

        if(modalNum === 1){
            pauseQuizModal.hide();
            confirmExitModal.show();
        } else if(modalNum === 2){
            confirmExitModal.hide();
            pauseQuizModal.show();
        }
    }

    return (
        <>
            {/* navbar is a bootstrap design that utilizes bootsrap script to function */}
            <nav className="navbar navbar-dark bg-dark mb-4">
                    {
                        // regular navbar will only appear if user is not taking a quiz
                        !state.takingQuiz ? (
                            <div className="container-fluid">
                                <a className="navbar-brand" id='pageTitle' href='/'>J.A.D.A. Quiz App</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h3 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dashboard</h3>
                                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                            {AuthService.loggedIn() ? (
                                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/">Home</a></h4>
                                                    </li>
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/profile">Profile</a></h4>
                                                    </li>
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/createQuiz">Create Quiz</a></h4>
                                                    </li>
                                                    <li className="nav-item mb-3">
                                                        <h4 id="logOutLink" onClick={AuthService.logout}>Logout</h4> 
                                                    </li>
                                                </ul>
                                            ):(
                                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/">Home</a></h4>
                                                    </li>
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/login">Login</a></h4>
                                                    </li>
                                                    <li className="nav-item mb-3">
                                                        <h4><a href="/signup">Sign Up</a></h4>
                                                    </li>
                                                </ul>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ):(
                            //if user is taking a quiz than only a 'pause time' button will appear in the navbar
                            <div className="container-fluid">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pauseQuizModal" onClick={pauseTime}>
                                    Pause Quiz
                                </button>
                            </div>
                        )
                    }
            </nav>
            {/* when the user clicks pause a static modal pops up that can only be closed by clicking resume quiz or by exiting the quiz */}
            <div className="modal fade" id="pauseQuizModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="pauseQuizModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h1 className="modal-title fs-5" id="pauseQuizModalLabel">Quiz Paused</h1>
                        </div>
                        <div className="modal-body d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => toggleModal(1)}>Exit Quiz</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={resumeTime}>Resume Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* if user selects exit then a second modal will pop up that informs the user their current progress will be lost at which point they can exit or cancel */}
            <div className="modal fade" id="confirmExitModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="confirmExitModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h1 className="modal-title fs-5" id="confirmExitModalLabel">Quiz Paused</h1>
                        </div>
                        <div className="modal-body d-flex flex-column text-center">
                            <h5>Are you sure you want to abandon this quiz?</h5>
                            <p>You current progress will be lost!</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => window.location.assign('/')}>Exit Quiz</button>
                            <button type="button" className="btn btn-secondary" onClick={() => toggleModal(2)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;