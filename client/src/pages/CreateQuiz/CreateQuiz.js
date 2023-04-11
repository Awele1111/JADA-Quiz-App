import React, { useState } from 'react';
import './createQuiz.css'
import trashLogo from '../../assets/trashLogo.svg';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_QUIZ, UPDATE_QUIZ } from '../../utils/mutations';
import { QUERY_QUIZ } from '../../utils/queries'
import { Modal } from 'bootstrap'

const CreateQuiz = () => {
	//two states track all the quiz data. Overarching quiz info such as title, and an array of questions which contains an array of choices
	const [quizValues, setQuizValues] = useState({title: '', public: true, style: 'defualt', category: '', description: ''});
	const [questionValues, setQuestionValues] = useState([{ question: "", choices: [{choice: '', correct: false}]}])
	const [createQuiz] = useMutation(CREATE_QUIZ);
	const [updateQuiz] = useMutation(UPDATE_QUIZ);
	const [loaded, setLoaded] = useState(false);

	let path = window.location.pathname.split('/')
	let quizId;
	//if the user wants to update a quiz then the id is passed through the url
	if(path.length > 2) {
		quizId = path[2];
	}
	const { loading, data } = useQuery(QUERY_QUIZ, { variables: {id: quizId}});
	let quizData = data?.quiz || null;
	//once quizData is loaded the state variables are set the the quiz data to render the form
	// the loaded state ensures this only happens once to prevent an infinite loop
	if(quizData && !loaded) {
		setLoaded(true);
		setQuizValues({title: quizData.title, public: quizData.public, style: quizData.style, category: quizData.category, description: quizData.description});
		let questionList = [];
		for(let questionObj of quizData.questions){
			let choiceList = [];
			for(let choiceObj of questionObj.choices){
				choiceList.push({choice: choiceObj.choice, correct: choiceObj.correct});
			}
			questionList.push({question: questionObj.question, choices: choiceList});
		}
		setQuestionValues(questionList);
	}

	if(loading) {
		return (<div>Loading...</div>)
	}
	//updates the first state quizInfo on any change
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
				break;
		}
		setQuizValues(newQuizValues)
	}
	//tracks any change to any question
	let handleQuestionChange = (questionIndex, event) => {
		let newQuestionValues = [...questionValues];
		newQuestionValues[questionIndex][event.target.name] = event.target.value;
		setQuestionValues(newQuestionValues);
	}
	//tracks any change to any choice
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
	//adds another question object to the state array questionValues
	let addQuestion = () => {
		setQuestionValues([...questionValues, { question: "", choices: [{choice: '', correct: false}]}])
	}
	//adds another choice object to the choices array within a specific question
	let addChoice = (questionIndex) => {
		let newQuestionValues = [...questionValues];
		newQuestionValues[questionIndex].choices.push({choice: '', correct: false});
		setQuestionValues(newQuestionValues);
	}
	//removes a question object from the state questionValues
	let removeQuestion = (questionIndex) => {
		let newQuestionValues = [...questionValues];
		newQuestionValues.splice(questionIndex, 1);
		setQuestionValues(newQuestionValues);
	}
	//removes a choice from the choice array in a specific question object within the questionValues state variable
	let removeChoice = (questionIndex, choiceIndex) => {
		let newQuestionValues = [...questionValues];
		newQuestionValues[questionIndex].choices.splice(choiceIndex, 1);
		setQuestionValues(newQuestionValues);
	}
	//handles the validation of the quiz submition. Questions cannot be left blank nor choices
	//all questions require one correct choice and the quiz must have a title and a selected category
	//if the server responds with a bad request it means the quiz title is already taken since title is unique in the quiz schema
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
			let successModal = new Modal(document.getElementById('successModal'), {});
			if(loaded){
				try {
					quizValues.quizId = quizId;
					await updateQuiz({variables: quizValues});
					//if successful, initializes the modal found at the end of the return
					successModal.show();
				} catch (error){
					document.getElementById("overallFormError").innerHTML = "There is already a quiz with this Title!";
					document.getElementById('quizTitleError').innerHTML = "This Title is already in use. Select a new Title.";
				}
			} else {
				try {
					await createQuiz({variables: quizValues});
					//if successful, initializes the modal found at the end of the return
					successModal.show();
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
		<>
			{/* the overall form for the quiz */}
			<form className='form row-cols-lg-auto g-3 align-items-center mx-auto' onSubmit={handleSubmit}>
				{/* up top is the overarching data such as title, description, public/private, category and styling */}
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
								<option value="black">Black</option>
								<option value="brown">Brown</option>
								<option value="green">Green</option>
								<option value="orange">Orange</option>
								<option value="pink">Pink</option>
								<option value="red">Red</option>
								<option value="yellow">Yellow</option>
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
				{/* next is the questions themselves */}
				{questionValues.map((questionElement, questionIndex) => (
					<div className="oneQuestionContainer" key={questionIndex}>
						<div className='row g-0' id={`question${questionIndex}`}>
							{/* each question is split up into two boxes which will render side by side on larger screens and stacked on smaller screens */}
							{/* first box houses the question itself */}
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
								{/* all quizzes require at least one question so the first question is rendered without a delete button */}
								{
									questionIndex ? (
										<div className='d-flex justify-content-center mt-3 removeQuestionContainer'>
											<button type="button"  className="btn btn-danger mb-3" onClick={() => removeQuestion(questionIndex)}>Remove Question</button> 
										</div>
									)
									: null
								}
							</div>
							{/* second box contains the choices */}
							<div className='choiceInfoContainer'>
								<div className='d-flex justify-content-between choiceInfo ms-4 mb-1 mt-2'>
									<h5 className='mb-0'>{`Question #${questionIndex + 1}`}</h5>
									<p className='mb-0'>Select Answer</p>
								</div>
								<p id={`question${questionIndex}noAnswerError`} className='text-end myError'></p>
								{/* user can add as many choices as they would like per question so map over the choice array for each question object in the state */}
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
											{/* each question requires at least one choice so first choice renders without a trash logo (delete button) */}
											{
												choiceIndex ? (
													<img src={trashLogo} 
														className='logo mt-3 ms-3 mb-3' 
														alt='Trash Logo' 
														onClick={() => removeChoice(questionIndex, choiceIndex)}>
													</img>
												)
												: (
													// to line it up create the first choice with empty space on the right hand side where the trash logo goes on the others
													<div className='m-1 p-3'></div>
												)
											}
										</div>
										{/* each choice has an error message specific to that choice whic will display if the user left that choice empty */}
										<p id={`choice${questionIndex}-${choiceIndex}error`} className='errorMessage myError ms-4'></p>
									</div>
								))}
								<div className="button-section">
									{/* user can always add another choice to their question which updates the state variable and adds another item for this innder map function to render */}
									<div className='d-flex justify-content-center mt-3 mb-3'>
										<button className="btn btn-secondary" type="button" onClick={() => addChoice(questionIndex)}>Add Choice</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
				{/* lastly there is a button to add another question which renders another question and choice row to the page */}
				{/* and if the user is creating a quiz there is a button labeled submit but if they are updating the quiz the button says save */}
				<div className="button-section d-flex justify-content-center">
					<button className="btn btn-secondary m-3" type="button" onClick={() => addQuestion()}>Add Question</button>
					{loaded ? (
						<button className="btn btn-primary m-3 ps-4 pe-4" type="submit">Save</button>
					):(
						<button className="btn btn-primary m-3" type="submit">Submit</button>
					)}
				</div>
				<div className="button-section d-flex justify-content-center">
					{/* at the end of the page is an error message to make it clear if the quiz contains any errors */}
					{/* easier than automatically scrolling to the position of the error since there may be many or just one at the top */}
					<p id="overallFormError" className='errorMessage myError'></p>
				</div>
			</form>
			{/* once the user submits or saves their quiz a modal pops up alerting them of the success.  */}
			{/* From here users have to choice to navigate to their profile or to the home page */}
			<div className="modal fade" id="successModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
						{
							loaded ? (
								<h1 className="modal-title fs-5" id="staticBackdropLabel">Saved!</h1>
							): (
								<h1 className="modal-title fs-5" id="staticBackdropLabel">Quiz Created!</h1>
							)
						}
                    </div>
					<div className="modal-footer d-flex justify-content-center">
						<p>You can edit this quiz at any time from your profile page</p>
					</div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={() => window.location.assign('/')}>Home Page</button>
                        <button type="button" className="btn btn-primary" onClick={() => window.location.assign('/profile')}>Profile Page</button>
                    </div>
                    </div>
                </div>
            </div>
		</>
)};
			
export default CreateQuiz;