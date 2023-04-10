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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='mb-5 mx-4'>
        <h2 className='ms-5 mb-4'>{quizData.title} Scoreboard:</h2>
        <div className='mainContainer container'>
          <table className="table mb-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Score</th>
                <th scope="col">Time</th>
                <th scope="col">Player</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* renders top 10 highscores */}
              {quizData.getScoreboard.slice(0, 10).map((score, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{score.score}%</td>
                  <td>{score.time} seconds</td>
                  <td>{score.username}</td>
                  <td>{score.dateAdded}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn btn-primary" onClick={() => window.location.replace(`/takeQuiz/${id}`)}>Back to Quiz</button>
        </div>
      </div>
    </>
  )
}

export default HighScores;