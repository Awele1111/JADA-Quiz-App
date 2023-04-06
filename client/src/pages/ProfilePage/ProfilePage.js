import './profilePage.css'
import { Link, useParams } from 'react-router-dom';
import trashLogo from '../../assets/trashLogo.svg';
import favoriteLogo from '../../assets/favoriteLogo.svg';
import editLogo from '../../assets/editLogo.svg';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_QUIZZES } from '../../utils/queries';
import { REMOVE_FAVORITE, DELETE_QUIZ } from '../../utils/mutations';
import Auth from '../../utils/auth';
import MyQuizzes from './profileComponents/myQuizzes';

const ProfilePage = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { _id: userParam },
    });
    const [removeFavorite, { error, removeData }] = useMutation(REMOVE_FAVORITE);
    const [deleteQuiz, { deleteError, deleteData }] = useMutation(DELETE_QUIZ);

    const user = data?.me || {};

    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
        return <Link to='/profile' />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?._id) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to sign up or log in!
            </h4>
        );
    }
 
    //replace with userQuery
    let testUser = {
        username: "dmanaglia",
        email: "ddsmm.managlia@gmail.com",
        password: "dannyPassword",
        favoriteQuizes: [
            {
                title: "Everton Quiz",
                creator: "coleman4Life",
                _id: 1
            },
            {
                title: "Anime Quiz",
                creator: "mobPsycho100",
                _id: 2
            },
            {
                title: "History Quiz",
                creator: "history101",
                _id: 3
            },
            {
                title: "Elder Scrolls 101",
                creator: "The Dragonborn",
                _id: 4
            },
            {
                title: "Everton Quiz",
                creator: "coleman4Life",
                _id: 1
            },
        ]
    }
    //replace with myQuizzesQuery
    let myQuizes = [
        {
            title: "Math 101",
            _id: 5
        },
        {
            title: "Marvel Mania",
            _id: 6
        },
        {
            title: "Fantastic Beasts and Where to Find Them",
            _id: 7
        },
    ]


    const handleUnlike = async (event) => {
        let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to unlike the quiz "${title}"?`)

        const { removeData } = await removeFavorite({
            variables: { _id }
        });
       
        
    }


    const handleDelete = (event) => {
        // let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to delete the quiz "${title}"? (This cannot be undone!)`)
    }

// console.log(user.favoriteQuizses[0]._id);

    return (
        <div className='mb-5'>

            <h2 className='ms-5 mb-4'>{user.username}</h2>
            <div className='mainContainer'>
                <div className='profileContainer'>
                    <h1 className='mb-5 mt-3'>Your Favorite Quizzes</h1>
                    <div className='container'>
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
                                    <a className='quizLink' onClick={() => console.log(`navigating to ${quiz.title}`)}>

                                        {quiz.title} by {quiz.creator.username}

                                    </a>
                                </h4>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='profileContainer'>
                    <h1 className='mb-5 mt-3'>Your Created Quizzes</h1>
                    <MyQuizzes userId={user._id}/>
                    <div className='mt-5'>
                        <button className='btn btn-secondary'
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