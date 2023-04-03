import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            Welcome To The Quiz App!
            <div>
                <Link to={{ pathname: `/createQuiz`}}>
                    Create a new Quiz Here!
                </Link>
            </div>
        </div>
    )
};

export default Home;