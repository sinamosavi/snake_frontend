import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    changeProfile
} from '../../reducers/funcs'

class ProfileForm extends React.Component {
    handleChangeProfile(e) {
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let first_name = this.refs.first_name.value;
        let last_name = this.refs.last_name.value;
        let gender = this.refs.gender.value;
        let birthday = this.refs.birthday.value;
        let city = this.refs.city.value;
        this.props.onChangeProfile(this.props.user, username, password, first_name, last_name, gender, birthday, city)
    }

    render() {
        return (
            (this.props.user)?
                (<form onSubmit={this.handleChangeProfile.bind(this)}>
                <h3>Sign up</h3>
                <input type="username" ref="username" placeholder={this.props.user.get("username").toString()}/>
                <input type="text" ref="first_name" placeholder={this.props.user.get("first_name").toString()}/>
                <input type="text" ref="last_name" placeholder={this.props.user.get("last_name").toString()}/>
                <input type="text" ref="gender" placeholder={this.props.user.get("gender").toString()}/>
                <input type="date" ref="birthday" placeholder={this.props.user.get("birthday").toString()}/>
                <input type="text" ref="city" placeholder={this.props.user.get("city").toString()}/>
                <input type="password" ref="password" placeholder="hidden"/>
                <input type="submit" value="ChangeProfile"/>
            </form>)
                :
                <p>Sign in first, you dumbass!</p>
        )
    }
}

const ChangeProfile = props => (
    <div>
        <h1>My cool App</h1>
        {
            <ProfileForm onChangeProfile={props.changeProfile} user={props.user}/>
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.funcs.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeProfile
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeProfile)
