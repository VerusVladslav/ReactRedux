function validateFields(items) {

    const { email, password } = items;
    let errors = {};
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;


    if (!regex_email.test(email.trim())) errors.email = "Не вірна електронна пошта!";

    if (!regex_password.test(password.trim())) errors.password = "Пароль повинен мати мінімум 6 символів, нижній і верхній регістр, та цифри!";
        
    
    return errors;
}

export { validateFields };