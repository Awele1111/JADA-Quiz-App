import './quizList.css';
import { useQuery } from "@apollo/client";
import { QUIZ_CATEGORY } from '../../../utils/queries';

const QuizList = ({category}) => {
    const { loading, data } = useQuery(QUIZ_CATEGORY, {
        variables: { category: category }
    });

    let quizData = data?.quizCategory || [];

    if (loading) {
        return <h3>Loading...</h3>
    }
    // list will not load until the query is completed. 
    // at which point it will return a list of quizzes that act as links to the specific quiz
    return (
        <ul className='quizList'>
            {quizData.map((quiz, index) => (
                <li className='quizItem' key={index}><a className='quizLink' href={`/takeQuiz/${quiz._id}`}>{`${quiz.title} created by ${quiz.creator.username}`}</a></li>
            ))}
        </ul>
    )
}

export default QuizList;