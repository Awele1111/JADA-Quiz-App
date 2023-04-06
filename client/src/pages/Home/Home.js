import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './home.css';
import generalPic from '../../assets/generalCategory.jpeg';
import schoolPic from '../../assets/schoolCategory.jpeg';
import sportsPic from '../../assets/sportsCategory.png';
import gamesPic from '../../assets/gamesCategory.jpeg';
import popCulturePic from '../../assets/popCultureCategory.jpeg';
import musicPic from '../../assets/musicCategory.jpeg';
import otherPic from '../../assets/otherCategory.webp';

import QuizList from '../../components/QuizList/QuizList';

const Home = () => {
    const [pageCategory, setCategory] = useState('Categories')

    let categories = [
        {category: "General", image: generalPic}, 
        {category: "School", image: schoolPic}, 
        {category: "Sports", image: sportsPic}, 
        {category: "Games", image: gamesPic}, 
        {category: "Pop Culture", image: popCulturePic}, 
        {category: "Music", image: musicPic}, 
        {category: "Other", image: otherPic}
    ];

    return (
        <>
            <div className='welcomeInfo'>
                <h3>Welcome To The Quiz App!</h3>
                <p>Browse our user created Quizzes and test your knowledge! Login or sign up to save your favorite quizzes, to save your highscores and to create your own quizzes for other users!</p>
            </div>
            
            <main className='container text-center position-relative'>
                {
                    pageCategory !== "Categories" ? (
                        <button className='position-absolute start-0 top-0 btn btn-secondary mt-4 ms-5'
                                onClick={() => setCategory("Categories")}>Back To Categories</button>
                    ) : null}
                <h4 className='pt-4 pb-4'>{pageCategory}</h4>
                {pageCategory === "Categories" ? (
                    <div className="d-flex flex-wrap justify-content-center">
                        {categories.map((item, index) => (
                            <div className="card text-bg-dark customCard m-4 p-0 w-25" key={index}>
                                <img src={item.image} className="card-img h-100" alt={item.category}></img>
                                <div className="card-img-overlay myOverlay" onClick={() => {setCategory(item.category)}}>
                                    <div className='d-flex flex-column position-absolute top-50 start-50 translate-middle'>
                                        <h1 className="card-title category-title">
                                            {item.category}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ): (
                    <QuizList category={pageCategory}/>
                )}
            </main>
        </>
    )
};

export default Home;