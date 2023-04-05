import React, { useState } from 'react'

const CreateQuiz = () => {
    const [quizValues, setQuizValues] = useState({title: '', public: true, style: 'defualt'});
    const [questionValues, setQuestionValues] = useState([{ question: "", choices: [{choice: '', correct: false}]}])

    let handleInfoChange = (event) => {
      let newQuizValues = quizValues;
      switch (event.target.name) {
        case 'quizTitle':
          newQuizValues.title = event.target.value;
          break
        case 'quizSecurity':
          if(event.target.value === 'public'){
            newQuizValues.public = true;
          } else {
            newQuizValues.public = false;
          }
          break
        case 'quizStyling':
          newQuizValues.style = event.target.value;
          break
      }
      setQuizValues(newQuizValues)
    }

    let handleQuestionChange = (questionIndex, event) => {
      let newQuestionValues = [...questionValues];
      newQuestionValues[questionIndex][event.target.name] = event.target.value;
      setQuestionValues(newQuestionValues);
    }

    let handleChoiceChange = (questionIndex, choiceIndex, event) => {
      let newQuestionValues = [...questionValues];
      if(event.target.name === 'toggleCorrect'){
        if(event.target.value === 'correct'){
          newQuestionValues[questionIndex].choices[choiceIndex].correct = true;
        } else {
          newQuestionValues[questionIndex].choices[choiceIndex].correct = false;
        }
      } else {
        newQuestionValues[questionIndex].choices[choiceIndex].choice = event.target.value;
      }
      setQuestionValues(newQuestionValues);
    }
    
    let addQuestion = () => {
      setQuestionValues([...questionValues, { question: "", choices: [{choice: '', correct: false}]}])
    }

    let addChoice = (questionIndex) => {
      let newQuestionValues = [...questionValues];
      newQuestionValues[questionIndex].choices.push({choice: '', correct: false});
      setQuestionValues(newQuestionValues);
    }
    
    let removeQuestion = (questionIndex) => {
      let newQuestionValues = [...questionValues];
      newQuestionValues.splice(questionIndex, 1);
      setQuestionValues(newQuestionValues);
    }

    let removeChoice = (questionIndex, choiceIndex) => {
      let newQuestionValues = [...questionValues];
      newQuestionValues[questionIndex].choices.splice(choiceIndex, 1);
      setQuestionValues(newQuestionValues);
    } 
    
    let handleSubmit = (event) => {
      event.preventDefault();
      //include some sort of form validation that checks to ensure each question has one correct answer
      quizValues.questions = questionValues;
      console.log(quizValues);
    }

    return (
        <form  onSubmit={handleSubmit}>
            <div className='quizInfo'>
              <label>Title</label>
              <input type='text' name='quizTitle' placeholder='Title' onChange={event => handleInfoChange(event)} />
              <label>Quiz Accessibility</label>
              <select name="quizSecurity" placeholder='Title' onChange={event => handleInfoChange(event)}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <label>Quiz Styling</label>
              <select name="quizStyling" onChange={event => handleInfoChange(event)}>
                <option value="default">Default</option>
              </select>
            </div>
          {questionValues.map((questionElement, questionIndex) => (
            <div className="form-inline" key={questionIndex}>
              <label>Question</label>
              <input type="text" name="question" value={questionElement.question || ""} onChange={event => handleQuestionChange(questionIndex, event)} />
              {
                questionIndex ? 
                  <button type="button"  className="button remove" onClick={() => removeQuestion(questionIndex)}>Remove</button> 
                : null
              }
              {questionElement.choices.map((choiceElement, choiceIndex) => (
                <div className="form-inline" key={questionIndex}>
                <label>Choice {choiceIndex + 1}</label>
                <input type="text" name="choice" value={choiceElement.choice || ""} onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)} />
                <select name="toggleCorrect" onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)}>
                  <option value="incorrect">Incorrect</option>
                  <option value="correct">Correct</option>
                </select>
                {
                  choiceIndex ? 
                    <button type="button"  className="button remove" onClick={() => removeChoice(questionIndex)}>Remove</button> 
                  : null
                }
                </div>
              ))}
              <div className="button-section">
                <button className="button add" type="button" onClick={() => addChoice(questionIndex)}>Add Choice</button>
              </div>
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addQuestion()}>Add Question</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    )
};

export default CreateQuiz;