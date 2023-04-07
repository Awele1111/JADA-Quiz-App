import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { HIGHSCORES } from "../../utils/queries";


const HighScores = () => {
const { id } = useParams();

const { loading, data } = useQuery(HIGHSCORES, {
    variables: { id: id },
});
const quizData = data?.highScores || [];
console.log(quizData);

if (loading) {
    return <div>Loading...</div>
}

// return <code>
// <pre>
//   {JSON.stringify(quizData, null, 2)}
// </pre>
// </code>

return (
    <>
    
    <div className='mb-5'>
    <h2 className='ms-5 mb-4'>{quizData.title} Scoreboard:</h2>
    <div className='mainContainer'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Score</th>
      <th scope="col">Time</th>
      <th scope="col">Player</th>
    </tr>
  </thead>
  <tbody>
    {quizData.getScoreboard.map((score, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{score.score}</td>
      <td>time?</td>
      <td>{score.username}</td>
    </tr>
    ))}
  </tbody>
</table>

    </div>

    </div>
    </>
)
}

export default HighScores