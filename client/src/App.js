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

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from './pages/Home/Home';
import CreateQuiz from './pages/CreateQuiz/CreateQuiz';
import Nav from './components/Nav/Navbar'
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TakeQuiz from './pages/TakeQuiz/TakeQuiz';
import HighScores from './pages/TakeQuiz/HighScore';
import Footer from './components/Footer/Footer'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [currentForm, setCurrentForm] = useState ('login');

  
  return (
    <ApolloProvider client={client}>
        <Router>
          <>
            <QuizProvider>
              <Nav />
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
            </QuizProvider>
          </>
        </Router>
      </ApolloProvider>
  );
}

export default App;
