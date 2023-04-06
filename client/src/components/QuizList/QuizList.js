import './quizList.css';
import { useQuery } from "@apollo/client";
import { QUIZ_CATEGORY } from '../../utils/queries';

const QuizList = ({category}) => {
    console.log(category);
  const { loading, data } = useQuery(QUIZ_CATEGORY, {
    variables: { category: category }
  });
  let quizData = data?.quizCategory || [];
console.log(quizData);
if (loading) {
    return <h3>Loading...</h3>
}

    let testQuizList = [
        {
            title: `${category} Quiz #1`,
            creator: 'username1'
        },
        {
            title: `${category} Quiz #2`,
            creator: 'username2'
        },
        {
            title: `${category} Quiz #3`,
            creator: 'username3'
        }
    ]
    return (
        <ul className='quizList'>
            {quizData.map((quiz, index) => (
                <li onClick={() => console.log(`navigating to ${quiz.title}`)} className='quizItem' key={index}>{`${quiz.title} created by ${quiz.creator.username}`}</li>
            ))}
        </ul>
    )
}

export default QuizList;