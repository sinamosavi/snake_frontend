import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    signUp
} from '../../modules/funcs'

class SignUpForm extends React.Component {
    handleSignUp(e) {
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let first_name = this.refs.first_name.value;
        let last_name = this.refs.last_name.value;
        let gender = this.refs.gender.value;
        let birthday = this.refs.birthday.value;
        let city = this.refs.city.value;
        this.props.onSignUp(username, password, first_name, last_name, gender, birthday, city)
    }
    render() {
        return (
            <form onSubmit={this.handleSignUp.bind(this)}>
                <h3>Sign up</h3>
                <input type="username" ref="username" placeholder="enter your username"/>
                <input type="text" ref="first_name" placeholder="enter your first_name"/>
                <input type="text" ref="last_name" placeholder="enter your last_name"/>
                <input type="text" ref="gender" placeholder="enter your gender"/>
                <input type="date" ref="birthday" placeholder="enter your birthday"/>
                <input type="text" ref="city" placeholder="enter your city"/>
                <input type="password" ref="password" placeholder="enter password"/>
                <input type="submit" value="SignUp"/>
            </form>
        )
    }
}

const SignUp = props => (
    <div>
        <h1>My cool App</h1>
        {
            (props.user) ?
                <p>you are signed in</p>
                :
                <SignUpForm onSignUp={props.signUp}/>
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.funcs.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)
