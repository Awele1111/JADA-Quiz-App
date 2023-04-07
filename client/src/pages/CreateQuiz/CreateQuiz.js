import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import './createQuiz.css'
import trashLogo from '../../assets/trashLogo.svg';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_QUIZ } from '../../utils/mutations';
import { QUERY_QUIZ } from '../../utils/queries'

const CreateQuiz = (props) => {
	const [quizValues, setQuizValues] = useState({title: '', public: true, style: 'defualt', category: '', description: ''});
	const [questionValues, setQuestionValues] = useState([{ question: "", choices: [{choice: '', correct: false}]}])
	const [createQuiz, {error, newData}] = useMutation(CREATE_QUIZ);
	const [loaded, setLoaded] = useState(false);

	let path = window.location.pathname.split('/')
	let quizId;
	if(path.length > 2) {
		quizId = path[2];
	}
	const { loading, data } = useQuery(QUERY_QUIZ, { variables: {id: quizId}});
	let quizData = data?.quiz || null;
	
	if(quizData && !loaded) {
		setLoaded(true);
		setQuizValues({title: quizData.title, public: quizData.public, style: quizData.style, category: quizData.category, description: quizData.description});
		setQuestionValues(quizData.questions);
	}

	if(loading) {
		return (<div>Loading...</div>)
	}

	let handleInfoChange = (event) => {
		let newQuizValues = {...quizValues};
		switch (event.target.name) {
			case 'quizTitle':
				newQuizValues.title = event.target.value;
				break
			case 'quizSecurity':
				if(event.target.value === 'true'){
					newQuizValues.public = true;
				} else {
					newQuizValues.public = false;
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
			default:
				console.log("Something went wrong!");
				break;
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
		if(event.target.name === 'choice'){
			newQuestionValues[questionIndex].choices[choiceIndex].choice = event.target.value;
		} else {
			for(let choice of newQuestionValues[questionIndex].choices){
				choice.correct = false;
			}
			if(event.target.value === 'on'){
				newQuestionValues[questionIndex].choices[choiceIndex].correct = true;
			} else {
				newQuestionValues[questionIndex].choices[choiceIndex].correct = false;
			}
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

	let handleSubmit = async (event) => {
		event.preventDefault();
		let allErrors = document.querySelectorAll('.myError');
		for(let error of allErrors){
			error.innerHTML = '';
		}
		let valid = true;
		if(!quizValues.title){
			valid = false;
			document.getElementById('quizTitleError').innerHTML = "All Quizzes Requires a Title";
		}
		if(!quizValues.category){
			valid = false;
			document.getElementById('quizCategoryError').innerHTML = "You Must Select a Category";
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
				document.getElementById(`question${questionIndex}noAnswerError`).innerHTML = "Must Specify Answer";
				valid = false;
			}
			questionIndex++;
		}
		if(valid){
			quizValues.questions = questionValues;
			if(loaded){
				//add functionality to update quiz
			} else {
				try {
					await createQuiz({variables: quizValues});
					alert("success");
					window.location.assign('/profile');
				} catch (error){
					document.getElementById("overallFormError").innerHTML = "There is already a quiz with this Title!";
					document.getElementById('quizTitleError').innerHTML = "This Title is already in use. Select a new Title.";
				}
			}
		} else {
			document.getElementById("overallFormError").innerHTML = "Your quiz has errors, double check all required values are present";
		}
	}

	return (
		<form className='form row-cols-lg-auto g-3 align-items-center mx-auto' onSubmit={handleSubmit}>
			<div className='quizInfoContainer pt-4'>
				<div id='quizTitleContainer'>
					<div className='form-floating quizTitle'>
						<input id='quizTitle'
						className="form-control"
						type='text'
						name='quizTitle'
						value={quizValues.title}
						placeholder='Title'
						onChange={event => handleInfoChange(event)}
						/>
						<label htmlFor="quizTitle">Quiz Title*</label>
						<p id="quizTitleError" className='errorMessage myError'></p>
					</div>
				</div>
				<div className='dropDownFlex d-flex justify-content-between w-100 pt-4'>
					<div className='dropDownElement'>
						<label className='me-2'>Quiz Accessability:</label>
						<select name="quizSecurity" defaultValue={quizValues.public ? 'true': 'false'} onChange={event => handleInfoChange(event)}>
							<option value='true'>Public</option>
							<option value='false'>Private</option>
						</select>
					</div>
					<div className='dropDownElement'>
						<label className='me-2'>Category*</label>
						<select name="quizCategory" defaultValue={quizValues.category} onChange={event => handleInfoChange(event)}>
							<option value="">--</option>
							<option value="General">General</option>
							<option value="School">School</option>
							<option value="Sports">Sports</option>
							<option value="Games">Games</option>
							<option value="Pop Culture">Pop Culture</option>
							<option value="Music">Music</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div className='dropDownElement'>
						<label className='me-2'>Quiz Styling:</label>
						<select name="quizStyling" defaultValue={quizValues.style} onChange={event => handleInfoChange(event)}>
							<option value="default">Default</option>
						</select>
					</div>
				</div>
				<div className='ms-5 text-center'>
					<p id="quizCategoryError" className='errorMessage myError pb-4'></p>
				</div>
				<div className='form-floating d-flex pb-4 mb-3'>
					<textarea id="quizDescription"
							type="text"
							name="quizDescription"
							className="form-control"
							placeholder='Description String'
							value={quizValues.description}
							onChange={event => handleInfoChange(event)} />
					<label htmlFor="quizDescription">{`Quiz Description (Optional)`}</label>
				</div>
			</div>
			{questionValues.map((questionElement, questionIndex) => (
				<div className="oneQuestionContainer" key={questionIndex}>
					<div className='row g-0' id={`question${questionIndex}`}>
						<div className='form-floating questionInputContainer'>
							<textarea id={`question${questionIndex}`}
									type="text"
									name="question"
									className="form-control questionInput"
									placeholder='Question String'
									value={questionElement.question || ""}
									onChange={event => handleQuestionChange(questionIndex, event)} />
							<label htmlFor={`question${questionIndex}`}>Question {questionIndex + 1}</label>
							<p id={`question${questionIndex}error`} className='questionError errorMessage myError ps-4'></p>
							{
								questionIndex ? (
									<div className='d-flex justify-content-center mt-3 removeQuestionContainer'>
										<button type="button"  className="btn btn-danger mb-3" onClick={() => removeQuestion(questionIndex)}>Remove Question</button> 
									</div>
								)
								: null
							}
						</div>
						<div className='choiceInfoContainer'>
							<div className='d-flex justify-content-between choiceInfo ms-4 mb-1 mt-2'>
								<h5 className='mb-0'>{`Question #${questionIndex + 1}`}</h5>
								<p className='mb-0'>Select Answer</p>
							</div>
							<p id={`question${questionIndex}noAnswerError`} className='text-end myError'></p>
							{questionElement.choices.map((choiceElement, choiceIndex) => (
								<div key={`${questionIndex}.${choiceIndex}`}>
									<div className="form-floating d-flex oneChoiceInput">
										<input  id={`choice${questionIndex + choiceIndex / 100}`}
												type="text"
												name="choice"
												className="form-control choiceInput"
												value={choiceElement.choice || ""}
												placeholder='Choice String'
												onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)} />
										<label htmlFor={`choice${questionIndex + choiceIndex / 10}`}>Choice {choiceIndex + 1}</label>
										{choiceElement.correct ? (
											<input name={`question${questionIndex}`}
													className="correctRadio m-3" 
													type="radio"
													checked
													onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)}>
											</input>
										): (
											<input name={`question${questionIndex}`}
													className="correctRadio m-3" 
													type="radio"
													onChange={event => handleChoiceChange(questionIndex, choiceIndex, event)}>
											</input>	
										)}
										{
											choiceIndex ? (
												<img src={trashLogo} 
													className='logo mt-3 ms-3 mb-3' 
													alt='Trash Logo' 
													onClick={() => removeChoice(questionIndex, choiceIndex)}>
                                        		</img>
											)
											: (
												<div className='m-1 p-3'></div>
											)
										}
									</div>
									<p id={`choice${questionIndex}-${choiceIndex}error`} className='errorMessage myError ms-4'></p>
								</div>
							))}
							<div className="button-section">
							<div className='d-flex justify-content-center mt-3 mb-3'>
								<button className="btn btn-secondary" type="button" onClick={() => addChoice(questionIndex)}>Add Choice</button>
							</div>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className="button-section d-flex justify-content-center">
				<button className="btn btn-secondary m-3" type="button" onClick={() => addQuestion()}>Add Question</button>
				{loaded ? (
					<button className="btn btn-primary m-3 ps-4 pe-4" type="submit">Save</button>
				):(
					<button className="btn btn-primary m-3" type="submit">Submit</button>
				)}
			</div>
			<div className="button-section d-flex justify-content-center">
				<p id="overallFormError" className='errorMessage myError'></p>
			</div>
		</form>
)};
			
export default CreateQuiz;