import React, { useState } from 'react'
import './createQuiz.css'

const CreateQuiz = () => {
	const [quizValues, setQuizValues] = useState({title: '', public: true, style: 'defualt', category: 'General', description: ''});
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
			case 'quizCategory':
				newQuizValues.category = event.target.value;
				break
			case 'quizDescription':
				newQuizValues.description = event.target.value;
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
		let allErrors = document.querySelectorAll('.errorMessage');
		for(let error of allErrors){
			error.innerHTML = '';
		}
		let valid = true;
		if(!quizValues.title){
			valid = false;
			document.getElementById('quizTitleError').innerHTML = "All Quizzes Requires a Title";
		}
		let questionIndex = 0;
		for(let questionObj of questionValues){
			if(!questionObj.question){
				document.getElementById(`question${questionIndex}error`).innerHTML = `Question ${questionIndex + 1} cannot be left blank`;
				valid = false;
			}
			let choiceIndex = 0;
			let correctCount = 0;
			for(let choiceObj of questionObj.choices){
				if(!choiceObj.choice){
					document.getElementById(`choice${questionIndex}-${choiceIndex}error`).innerHTML = `Choice ${choiceIndex + 1} cannot be left blank`;
					valid = false;
				}
				if(choiceObj.correct){
					correctCount++;
				}
				choiceIndex++;
			}
			if(correctCount !== 1){
				document.getElementById(`question${questionIndex}error`).innerHTML = "Question requires exactly 1 correct choice";
				valid = false;
			}
			questionIndex++;
		}
		if(valid){
			quizValues.questions = questionValues;
			alert("Success")
			console.log(quizValues);
		} else {
			document.getElementById("overallFormError").innerHTML = "Your quiz has errors, double check all required values are present";
		}
	}
	
	return (
		<form className='form row-cols-lg-auto g-3 align-items-center mx-auto' onSubmit={handleSubmit}>
			<div style={{background: "lightblue"}}>
				<div className='d-flex justify-content-between w-100 pt-4'>
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
					<select name="quizSecurity" onChange={event => handleInfoChange(event)}>
						<option value="public">Quiz Accessability</option>					
						<option value="public">Public</option>
						<option value="private">Private</option>
					</select>
					<select name="quizCategory" onChange={event => handleInfoChange(event)}>
						<option value="General">Category</option>
						<option value="General">General</option>					
						<option value="School">School</option>
						<option value="Sports">Sports</option>
						<option value="Games">Games</option>					
						<option value="Pop Culture">Pop Culture</option>
						<option value="Music">Music</option>
						<option value="Other">Other</option>
					</select>
					<select name="quizStyling" onChange={event => handleInfoChange(event)}>
						<option value="default">Quiz Styling</option>					
						<option value="default">Default</option>
					</select>
				</div>
				<p id="quizTitleError" className='errorMessage' style={{color: 'red'}}></p>
				<div className='form-floating d-flex pb-4 mb-3'>
					<textarea id="quizDescription"
							type="text"
							name="question"
							className="form-control"
							placeholder='Description String'
							onChange={event => handleInfoChange(event)} />
					<label htmlFor="quizDescription">{`Quiz Description (Optional)`}</label>
				</div>
			</div>
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
							<button type="button"  className="btn btn-danger" onClick={() => removeQuestion(questionIndex)}>Remove Question</button> 
							: null
						}
					</div>
					<p id={`question${questionIndex}error`} className='errorMessage' style={{color: 'red'}}></p>
					{questionElement.choices.map((choiceElement, choiceIndex) => (
						<div key={`${questionIndex}.${choiceIndex}`} className=''>
							<div className="form-floating choiceInfo d-flex">
								<input  id={`choice${questionIndex + choiceIndex / 100}`}
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
									<button type="button"  className="btn btn-danger" onClick={() => removeChoice(questionIndex, choiceIndex)}>Remove Choice</button> 
									: null
								}
							</div>
							<p id={`choice${questionIndex}-${choiceIndex}error`} className='errorMessage' style={{color: 'red'}}></p>
						</div>
					))}
					<div className="button-section">
						<button className="btn btn-secondary" type="button" onClick={() => addChoice(questionIndex)}>Add Choice</button>
					</div>
				</div>
			))}
			<div className="button-section d-flex justify-content-center">
				<button className="btn btn-secondary m-3" type="button" onClick={() => addQuestion()}>Add Question</button>
				<button className="btn btn-primary m-3" type="submit">Submit</button>
			</div>
			<div className="button-section d-flex justify-content-center">
				<p id="overallFormError" className='errorMessage' style={{color: 'red'}}></p>
			</div>
		</form>
)};
			
export default CreateQuiz;