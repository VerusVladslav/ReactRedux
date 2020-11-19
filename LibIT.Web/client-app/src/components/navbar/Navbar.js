import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';


class Navbar extends Component {
    LogOut () {
       // e.preventDefault();
      // console.log(this.state);
        // console.log("LogOUT");   
      // localStorage.removeItem('token');       
    }
    render() {
       
        return (
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">=Навігація=</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Головна <span className="sr-only">(current)</span></Link>
                        </li>
                        {!this.props.isAuthenticated&&
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Авторизація</Link>
                        </li>
                         }
                        
                        {!this.props.isAuthenticated &&
                         <li className="nav-item">
                            <Link className="nav-link" to="/register">Реєстрація</Link>
                        </li> 
                        }
                        
                       
                       <li className="nav-link"  ></li>
                            


                      {this.props.isAuthenticated &&
                        <li className="nav-link"  onClick={() => this.LogOut()}>Вийти</li>
                      }
                             

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Мова
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/">Action</Link>
                                <Link className="dropdown-item" to="/">Another action</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/">Something else here</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="/">Профіль</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

const mapState = (stateRedux) => {
    return {
        isAuthenticated: stateRedux.login.isAuthenticated
    }
}

export default connect(mapState)(Navbar);