import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_ATTEMPT } from "../../utils/mutations";

const HighScores = (props) => {
return (
    <>
    <div className='mb-5'>
    <h2 className='ms-5 mb-4'>{quiz.title} Scoreboard:</h2>
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
    {quiz.scores.map((score, index) => (
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
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