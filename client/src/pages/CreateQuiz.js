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
			if(event.target.value === 'private'){
				newQuizValues.public = false;
			} else {
				newQuizValues.public = true;
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
		<form className='form row-cols-lg-auto g-3 align-items-center mx-auto' onSubmit={handleSubmit}>
			<div className='d-flex justify-content-between w-100'>
				<div className='form-floating quizInfo'>
					<input id='quizTitle'
					className="form-control"
					type='text'
					name='quizTitle'
					placeholder='Title'
					onChange={event => handleInfoChange(event)} 
					style={{width: "150%"}}/>
					<label htmlFor="quizTitle">Quiz Title</label>
				</div>
				<select name="quizSecurity" placeholder='Title' onChange={event => handleInfoChange(event)}>
					<option value="public">Quiz Accessability</option>					
					<option value="public">Public</option>
					<option value="private">Private</option>
				</select>
				<select name="quizStyling" onChange={event => handleInfoChange(event)}>
					<option value="default">Quiz Styling</option>					
					<option value="default">Default</option>
				</select>
			</div>
			<p id="quizTitleError" className='errorMessage' style={{color: 'red'}}>Error Message</p>
			{questionValues.map((questionElement, questionIndex) => (
				<div className="questionInfo" key={questionIndex}>
					<div className='form-floating d-flex'>
						<textarea id={`question${questionIndex}`}
								type="text"
								name="question"
								className="form-control"
								placeholder='Question String'
								value={questionElement.question || ""}
								onChange={event => handleQuestionChange(questionIndex, event)} />
						<label htmlFor={`question${questionIndex}`}>Question {questionIndex + 1}</label>
						{
							questionIndex ? 
							<button type="button"  className="button remove" onClick={() => removeQuestion(questionIndex)}>Remove Question</button> 
							: null
						}
					</div>
					<p id={`question${questionIndex}error`} className='errorMessage' style={{color: 'red'}}>Error Message</p>
					{questionElement.choices.map((choiceElement, choiceIndex) => (
						<div key={questionIndex + choiceIndex / 10} className=''>
							<div className="form-floating choiceInfo d-flex">
								<input  id={`choice${questionIndex + choiceIndex / 10}`}
										type="text"
										name="choice"
										className="form-control w-50"
										value={choiceElement.choice || ""}
										placeholder='Choice String'
										onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)} />
								<label htmlFor={`choice${questionIndex + choiceIndex / 10}`}>Choice {choiceIndex + 1}</label>
								<select name="toggleCorrect" onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)}>
									<option value="incorrect">Incorrect</option>
									<option value="correct">Correct</option>
								</select>
								{
									choiceIndex ? 
									<button type="button"  className="button remove" onClick={() => removeChoice(questionIndex, choiceIndex)}>Remove Choice</button> 
									: null
								}
							</div>
							<p id={`question${questionIndex + choiceIndex / 10}error`} className='errorMessage' style={{color: 'red'}}>Error Message</p>
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
)};
			
export default CreateQuiz;