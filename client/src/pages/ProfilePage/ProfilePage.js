import './profilePage.css'
import { Link } from 'react-router-dom';
import trashLogo from '../../assets/trashLogo.svg';
import favoriteLogo from '../../assets/favoriteLogo.svg';
import editLogo from '../../assets/editLogo.svg';

const ProfilePage = () => {
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


    const handleUnlike = (event) => {
        // let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to unlike the quiz "${title}"?`)
    }


    const handleDelete = (event) => {
        // let _id = event.target.getAttribute("data-id");
        let title = event.target.getAttribute("data-title");
        console.log(`Are you sure you want to delete the quiz "${title}"? (This cannot be undone!)`)
    }

    return (
        <>
            <h2 className='ms-5 mb-5'>{testUser.username}</h2>
            <div className='d-flex justify-content-between w-100'>
                <div className='ms-5 profileContainer position-relative'>
                    <h3 className='mb-4'>Your Favorite Quizzes</h3>
                    <ul>
                    {testUser.favoriteQuizes.map((quiz, index) => (
                            <li className='mb-3' key={index}>
                                <h4 className='text-start'>
                                    <a className='quizLink' onClick={() => console.log(`navigating to ${quiz.title}`)}>
                                        {quiz.title} by {quiz.creator}
                                    </a>
                                    <span className='position-absolute end-0 me-3'>
                                        <img src={favoriteLogo} 
                                            className='logo' 
                                            alt='Favorite Logo' 
                                            data-id={quiz._id} 
                                            data-title={quiz.title} 
                                            onClick={(event) => handleUnlike(event)}>
                                        </img>
                                    </span>
                                </h4>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='me-5 profileContainer position-relative'>
                    <h3 className='mb-4'>Your Created Quizzes</h3>
                    <ul>
                        {myQuizes.map((quiz, index) => (
                            <li className='mb-3' key={index}>
                                <h4 className='text-start'>
                                    <a className='quizLink' onClick={() => console.log(`navigating to ${quiz.title}`)}>
                                        {quiz.title}
                                    </a>
                                    <span className='position-absolute end-0 me-3'>
                                        <Link to={{ pathname: '/createQuiz', state: {quizData: quiz}}}>
                                            <img src={editLogo} 
                                                className='logo me-4' 
                                                alt='Edit Quiz Logo' 
                                                data-id={quiz._id} 
                                                data-title={quiz.title}>
                                            </img>
                                        </Link>
                                        <img src={trashLogo} 
                                            className='logo' 
                                            alt='Trash Logo' 
                                            data-id={quiz._id} 
                                            data-title={quiz.title} 
                                            onClick={(event) => handleDelete(event)}>
                                        </img>
                                    </span>
                                </h4>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-5'>
                        <button className='btn btn-secondary'
                                onClick={() => window.location.assign('/createQuiz')}>
                                Create New Quiz
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;