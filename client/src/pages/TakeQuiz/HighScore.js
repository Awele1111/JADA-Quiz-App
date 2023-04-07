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
console.log(data);

if (loading) {
    return <div>Loading...</div>
}

return (
    <>
    <div className='mb-5'>
    <h2 className='ms-5 mb-4'>{quizData.title} Scoreboard:</h2>
    <div className='mainContainer'>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Score</th>
      <th scope="col">Time</th>
      <th scope="col">Player</th>
    </tr>
  </thead>
  <tbody>
    {quizData.highscores.map((score, index) => (
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{score.score}%</td>
      <td>{score.time} seconds</td>
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

export default HighScores;