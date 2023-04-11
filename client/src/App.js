import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css'
import { QuizProvider } from './utils/quizContext';

import Nav from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TakeQuiz from './pages/TakeQuiz/TakeQuiz';
import HighScores from './pages/TakeQuiz/HighScore';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
            <QuizProvider>
              <Nav />
              <div id='fullPageContent'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/createQuiz' component={CreateQuiz} />
                  <Route path='/createQuiz/:id' component={CreateQuiz} />
                  <Route exact path='/profile' component={ProfilePage} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/signUp' component={Register} />
                  <Route path='/takeQuiz/:id' component={TakeQuiz} />
                  <Route path='/highScores/:id' component={HighScores} />
                  <Route render={() => <h1>Wrong page!</h1>} />
                </Switch>
              </div>
              <Footer />
            </QuizProvider>
        </Router>
      </ApolloProvider>

  );
}

export default App;
