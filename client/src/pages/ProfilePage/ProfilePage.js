import './profilePage.css'
import { Link, useParams } from 'react-router-dom';
import favoriteLogo from '../../assets/favoriteLogo.svg';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_FAVORITE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import MyQuizzes from './profileComponents/myQuizzes';

const ProfilePage = () => {
    const { _id: userParam } = useParams();
    const favoritesQuery = useQuery(QUERY_ME, {
        variables: { _id: userParam },
    });
    const [removeFavorite, favoritesMutation] = useMutation(REMOVE_FAVORITE);

    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
        return <Link to='/profile' />;
    }
    
    if (favoritesQuery.loading || favoritesMutation.loading) {
        return <div>Loading...</div>;
    }

    let user;
    if(favoritesMutation.called){
        user = favoritesMutation.data?.removeFavorite || {};
    } else{
        user = favoritesQuery.data?.me || {};
    }

    if (!user?._id) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }

    const handleUnlike = async (event) => {
        let _id = event.target.getAttribute("data-id");
        try {
            await removeFavorite({
                variables: { quizId: _id }
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='mb-5'>
            <h2 className='ms-5 mb-4'>{user.username}</h2>
            <div className='mainContainer'>
                <div className='profileContainer'>
                    <h1 className='mb-5 mt-3'>Your Favorite Quizzes</h1>
                    <div className='container'>
                        {!user.favoriteQuizzes.length ? (
                            <h3>No Favorites Yet</h3>
                        ): (
                            <>
                                {user.favoriteQuizzes.map((quiz, index) => (
                                    <div className='row mb-4' key={index}>
                                        <div className='col-2 col-sm-1 d-flex align-items-center p-0'>
                                            <img src={favoriteLogo}
                                                className='logo ms-3'
                                                alt='Favorite Logo'
                                                data-id={quiz._id}
                                                data-title={quiz.title}
                                                onClick={(event) => handleUnlike(event)}>
                                            </img>
                                        </div>
                                        <div className='col'>
                                            <h4 className='text-start link-container mb-0'>
                                                <a className='quizLink' href={`/takeQuiz/${quiz._id}`}>
                                                    {quiz.title} by {quiz.creator.username}
                                                </a>
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className='profileContainer'>
                    <h1 className='mb-5 mt-3'>Your Created Quizzes</h1>
                    <MyQuizzes userId={user._id} />
                    <div className='mt-5'>
                        <button className='btn btn-light'
                            onClick={() => window.location.assign('/createQuiz')}>
                            Create New Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProfilePage;