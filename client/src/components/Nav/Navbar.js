import './navbar.css'
import React, { useState, useReducer } from 'react';
import AuthService from '../../utils/auth';

import { reducer } from '../../utils/reducers';
import { ADD_TO_PAUSE_TIME } from '../../utils/actions';
import { useQuizContext } from '../../utils/quizContext';


const Nav = () => {
    const [state, dispatch] = useQuizContext();
    const [startPauseTime, setStartPauseTime] = useState(0);

    const pauseTime = () => {
        setStartPauseTime(Date.now());
    }

    const resumeTime = () => {
        let totalTimePaused = Date.now() - startPauseTime;
        dispatch({ type: ADD_TO_PAUSE_TIME, payload: totalTimePaused})
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark mb-4">
                    {
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
                            <div className="container-fluid">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={pauseTime}>
                                    Pause Quiz
                                </button>
                            </div>
                        )
                    }
            </nav>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Quiz Paused</h1>
                    </div>
                    <div className="modal-body d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" onClick={() => window.location.assign('/')}>Exit Quiz</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={resumeTime}>Resume Quiz</button>
                    </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Nav;