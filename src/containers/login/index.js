import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  signIn,
  signOut,
} from '../../modules/funcs'

class LoginForm extends React.Component {
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.props.onSignIn(username, password)
    }
    render() {
        return (
            <form onSubmit={this.handleSignIn.bind(this)}>
                <h3>Sign in</h3>
                <input type="username" ref="username" placeholder="enter your username"/>
                <input type="password" ref="password" placeholder="enter password"/>
                <input type="submit" value="Login"/>
            </form>
        )
    }
}

const Login = props => (
    <div>
        <h1>My cool App</h1>
        {
            (props.user) ?
                <button onClick={props.signOut}>signOut</button>
                :
                <LoginForm onSignIn={props.signIn}/>
        }
    </div>
);

const mapStateToProps = state => ({
  user: state.funcs.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn,
  signOut,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
