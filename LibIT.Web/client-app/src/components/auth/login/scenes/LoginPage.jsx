import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EclipseWidget from '../../../common/eclipse';
import TextFieldGroup from '../../../common/TextFieldGroup';
import PhoneFieldGroup from '../../../common/PhoneFieldGroup';
import ImageFieldGroupCropper from "../../../common/ImageFieldGroupCropper";
import { validateFields } from "./validation";

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
        loading: this.props.loading,
        errors: this.props.errors
    }

    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Change props', nextProps);
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors } 
        );
    }

    
    onSubmitForm = (e) => {
        e.preventDefault();

        const errors = validateFields(this.state);
       
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const model = {
                Email: this.state.email,
                Password: this.state.password
            };
            this.props.loginUser(model);
            
            // this.setState({ errorMessage: "", errors, loading: true });
        }
        else {
            this.setState({ errorMessage: "Не валідна форма!", errors });
        }

        console.log("SubmitForm");
    }

    handlerChange = (e) => {
        console.log("e handler", e.target.name + " " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
        //this.setState
    }
    render() {
        console.log("Login props: ", this.props);
        console.log("Login state: ", this.state);
        //const errorMessage = this.state.errorMessage;
        const { 
            email,
            password,
            loading,
            errors
        } = this.state;
        console.log("Is Erors email:", !!errors["email"]);
        return (
            <>
                <div className="container">
                    <br />
                    <div className="card" style={{ marginBottom: "50px" }}>
                        <article className="card-body mx-auto" style={{ maxWidth: 600 + 'px' }}>
                            <h4 className="card-title mt-3 text-center">Вхід на сайт</h4>

                            {!!errors.invalid && <p className="text-center text-danger">{errors.invalid}</p>}
                           
                            
                            <form onSubmit={this.onSubmitForm}>
                              

                                <TextFieldGroup 
                                    field="email"
                                    value={email}
                                    label="Ектронна пошта"
                                    icon="fa fa-envelope"
                                    type="email"
                                    //placeholder="Email"
                                    error={errors.email}
                                    onChange={this.handlerChange}/>

                                <TextFieldGroup 
                                    field="password"
                                    value={password}
                                    label="Пароль"
                                    icon="fa fa-lock"
                                    type="password"
                                    //placeholder="Email"
                                    error={errors.password}
                                    onChange={this.handlerChange}/>


                                 <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                                </div>
                                <p className="text-center">Have an account? <Link to="/register">Register</Link> </p>
                            </form>
                        </article>
                    </div>
                </div>
                {loading && <EclipseWidget />}
            </>
        );
    }
}

export default LoginPage;