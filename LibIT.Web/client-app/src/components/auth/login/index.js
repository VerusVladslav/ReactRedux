import LoginPage from './scenes/LoginPage';
import {connect} from 'react-redux';
import {loginUser} from './actions';

const mapState = (stateRedux) =>
{
    return {
        loading: stateRedux.login.loading,
        errors: stateRedux.login.errors,
    }
}

const Login = LoginPage;
export default connect(mapState, {loginUser})(Login);