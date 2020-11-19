// import logo from './logo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { Component, Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
//import LoginPage from './components/auth/login/LoginPage';
//import RegisterPage from './components/auth/register/RegisterPage';
//import HomePage from './components/home/HomePage';
//import Navbar from './components/navbar/Navbar';
const HomePage = React.lazy(() => import('./components/home/HomePage'));
const Navbar = React.lazy(() => import('./components/navbar/Navbar'));
const Register = React.lazy(() => import('./components/auth/register'));
const Login = React.lazy(() => import('./components/auth/login'));


class App extends Component {
    render() {
        return (
            <Suspense fallback={<p>Loading ...</p>}>
                    <Navbar />
                    <div className="container">

                        <Switch>
                            <Route exact path='/' render={() => <HomePage />} />

                            <Route exact path='/login' render={() => <Login />} />

                            <Route exact path='/register' render={() => <Register />} />
                        </Switch>
                    </div>
            </Suspense>
            
        );
    }
}

export default App;