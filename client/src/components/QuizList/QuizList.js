import './quizList.css';
import { useQuery } from "@apollo/client";
import { QUIZ_CATEGORY } from '../../utils/queries';

const QuizList = ({category}) => {
    const { loading, data } = useQuery(QUIZ_CATEGORY, {
        variables: { category: category }
    });

    let quizData = data?.quizCategory || [];

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <ul className='quizList'>
            {quizData.map((quiz, index) => (
                <li onClick={() => console.log(`navigating to ${quiz.title}`)} className='quizItem' key={index}>{`${quiz.title} created by ${quiz.creator.username}`}</li>
            ))}
        </ul>
    )
}

export default QuizList;