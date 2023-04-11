import React, { useState } from 'react';
import Auth from '../../utils/auth';
import './home.css';
import generalPic from '../../assets/generalCategory.jpeg';
import schoolPic from '../../assets/schoolCategory.jpeg';
import sportsPic from '../../assets/sportsCategory.png';
import gamesPic from '../../assets/gamesCategory.jpeg';
import popCulturePic from '../../assets/popCultureCategory.jpeg';
import musicPic from '../../assets/musicCategory.jpeg';
import otherPic from '../../assets/otherCategory.webp';

import QuizList from './QuizList/QuizList';

import { useQuery } from '@apollo/client';
import { COUNT_BY_CATEGORY } from '../../utils/queries';

const Home = () => {
    // tracks the category selected. Default is to display all categories
    const [pageCategory, setCategory] = useState('Categories')
    const { data, loading } = useQuery(COUNT_BY_CATEGORY)

    const categoryData = data?.countByCategory || [];
    // page will not load until a query is completed that counts the amount of quizzes per category
    if (loading) {
        return <div>Loading...</div>
    }
    // for ease each category is an object with a name and a picture
    let categories = [
        {category: "General", image: generalPic}, 
        {category: "School", image: schoolPic}, 
        {category: "Sports", image: sportsPic}, 
        {category: "Games", image: gamesPic}, 
        {category: "Pop Culture", image: popCulturePic}, 
        {category: "Music", image: musicPic}, 
        {category: "Other", image: otherPic}
    ];

    // function that takes in a category name to retrive the quiz count from the query data
    const getCategoryCount = (categoryName) => {
        let count = 0;
        for(let categoryObj of categoryData){
            if(categoryObj._id === categoryName){
                count = categoryObj.count;
            }
        }
        let countString;
        if(count === 1){
            countString = '1 Quiz';
        } else {
            countString = `${count} Quizzes`
        }
        return countString
    }

    return (
        <>
                {/* slightly different welcome messages based on if the user is logged in or not */}
                {Auth.loggedIn() ? (
                    <div className='welcomeInfo'>
                        <h3>Welcome!</h3>
                        <p>Browse our user created Quizzes and test your knowledge or create your very own quiz to test the knowledge of others!</p>
                    </div>
                ) : (
                    <div className='welcomeInfo'>
                        <h3>Welcome To The JADA Quiz App!</h3>
                        <br/>
                        <p> - Browse our user created Quizzes and test your knowledge!  <br/>
                        
                        - Login or sign up to save your favorite quizzes, to save your highscores and to create your own quizzes for other users!</p>
                    </div>
                )}
            
            <main id="homeMain" className='text-center position-relative mb-5'>
                {/* if a category is selected then render a button that will take you back to all categories */}
                {
                    pageCategory !== "Categories" ? (
                        <button className='position-absolute start-0 top-0 btn btn-secondary mt-4 ms-5'
                                onClick={() => setCategory("Categories")}>Back To Categories</button>
                    ) : null}
                <h4 className='pt-4 pb-4'>{pageCategory}</h4>
                {/* The main container will display either all categories as images that are clickable */}
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
                                {/* gets quiz count per category */}
                                <p className='mt-2 mb-2'>{getCategoryCount(item.category)}</p>
                            </div>
                        ))}
                    </div>
                ): (
                    // Or if the user clicks on an image it will just display the quizzes in that category
                    <QuizList category={pageCategory}/>
                )}
            </main>
        </>
    )
};

export default Home;