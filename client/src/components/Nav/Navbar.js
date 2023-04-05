import { Link } from 'react-router-dom';
import './navbar.css'
import AuthService from '../../utils/auth';

const Nav = () => {
    return (
        <header className='customHeader'>
            {AuthService.loggedIn() ? (
                <nav className='customNav'>
                    <Link to={{ pathname: `/`}}>Home</Link>
                    <Link to={{ pathname: `/profile`}}>Profile</Link>
                    <Link to={{ pathname: `/createQuiz`}}>Create Quiz</Link>
                    <Link onClick={AuthService.logout}>Logout</Link>
                </nav>
            ): (
                <nav className='customNav'>
                    <Link to={{ pathname: `/`}}>Home</Link>
                    <Link to={{ pathname: `/login`}}>Login</Link>
                    <Link to={{ pathname: `/signUp`}}>Sign Up</Link>
                </nav>
            )}
        </header>
    )
}

export default Nav;