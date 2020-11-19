import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EclipseWidget from '../../../common/eclipse';
import TextFieldGroup from '../../../common/TextFieldGroup';
import PhoneFieldGroup from '../../../common/PhoneFieldGroup';
import ImageFieldGroupCropper from "../../../common/ImageFieldGroupCropper";
import { validateFields } from "./validation";

class RegisterPage extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        photo: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
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

    getCroppedImage = img => {
        if (!!this.state.errors["photo"]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors["photo"];
            this.setState({
                photo: img,
                errors
            });
        } else {
            this.setState({ photo: img });
        }
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        const errors = validateFields(this.state);
       
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const model = {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.email,
                Phone: this.state.phone,
                Photo: this.state.photo,
                Password: this.state.password,
                ConfirmPassword: this.state.confirmPassword
            };
            this.props.registerUser(model);
            
            this.setState({ errorMessage: "", errors, loading: true });
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
        console.log("Regiter props: ", this.props);
        console.log("Regiter state: ", this.state);
        //const errorMessage = this.state.errorMessage;
        const { firstName,
            lastName,
            email,
            phone,
            photo,
            password,
            confirmPassword,
            errorMessage,
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
                            <h4 className="card-title mt-3 text-center">Create Account</h4>

                            <p className="text-center text-danger">{errorMessage}</p>
                            <p>
                                <Link to="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>    Login via Twitter</Link>
                                <Link to="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>    Login via facebook</Link>
                            </p>
                            <p className="divider-text">
                                <span className="bg-light">OR</span>
                            </p>
                            <form onSubmit={this.onSubmitForm}>
                                <TextFieldGroup 
                                    field="firstName"
                                    value={firstName}
                                    label="Ім'я"
                                    icon="fa fa-user"
                                    //placeholder="Firstname"
                                    error={errors.firstName}
                                    onChange={this.handlerChange}/>

                                <TextFieldGroup 
                                    field="lastName"
                                    value={lastName}
                                    label="Прізвище"
                                    icon="fa fa-user"
                                    //placeholder="Lastname"
                                    error={errors.lastName}
                                    onChange={this.handlerChange}/>

                                <TextFieldGroup 
                                    field="email"
                                    value={email}
                                    label="Ектронна пошта"
                                    icon="fa fa-envelope"
                                    type="email"
                                    //placeholder="Email"
                                    error={errors.email}
                                    onChange={this.handlerChange}/>
                                
                                <PhoneFieldGroup 
                                    field="phone"
                                    value={phone}
                                    label="Телефон" 
                                    icon="fa fa-phone"
                                    error={errors.phone}
                                    onChange={this.handlerChange}/>

                                <ImageFieldGroupCropper
                                    getCroppedImage={this.getCroppedImage}
                                    error={errors.photo}
                                    photo={photo}
                                />

                                <TextFieldGroup 
                                    field="password"
                                    value={password}
                                    label="Пароль"
                                    icon="fa fa-lock"
                                    type="password"
                                    //placeholder="Email"
                                    error={errors.password}
                                    onChange={this.handlerChange}/>

                                <TextFieldGroup 
                                    field="confirmPassword"
                                    value={confirmPassword}
                                    label="Підтверження пароля"
                                    icon="fa fa-lock"
                                    type="password"
                                    //placeholder="Email"
                                    error={errors.confirmPassword}
                                    onChange={this.handlerChange}/>

                                 <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                                </div>
                                <p className="text-center">Have an account? <Link to="/login">Log In</Link> </p>
                            </form>
                        </article>
                    </div>
                </div>
                {loading && <EclipseWidget />}
            </>
        );
    }
}

export default RegisterPage;