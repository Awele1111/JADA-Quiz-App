import './quizList.css';

const QuizList = ({category}) => {
    // replace with query 
    let testQuizList = [
        {
            title: `${category} Quiz 1`,
            creator: 'username 1'
        },
        {
            title: `${category} Quiz 2`,
            creator: 'username 2'
        },
        {
            title: `${category} Quiz 3`,
            creator: 'username 3'
        }
    ]
    return (
        <ul className='quizList'>
            {testQuizList.map((quiz, index) => (
                <li onClick={() => console.log(`navigating to ${quiz.title}`)} className='quizItem' key={index}>{`${quiz.title} created by ${quiz.creator}`}</li>
            ))}
        </ul>
    )
}

export default QuizList;