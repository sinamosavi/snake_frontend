import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    signUp
} from '../../modules/funcs'
import {Link} from "react-router-dom";

const SignUp = props => (
    <div>
        {   props.game?
            <p>
                waiting...
                <br/>
                gameId: {props.game.id}
            </p>
            :
            <Link to={'/'}>home</Link>
        }
    </div>
);

const mapStateToProps = state => ({
    user: state.funcs.user,
    game: state.funcs.game,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)
