import './navbar.css'
import AuthService from '../../utils/auth';

const Nav = () => {
    return (
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" id='pageTitle' href="/">J.A.D.A. Quiz App</a>
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
            </nav>
    )
}

export default Nav;