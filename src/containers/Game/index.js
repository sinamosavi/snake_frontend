import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    signUp
} from '../../modules/funcs'
import {Link} from "react-router-dom";


const GameFrame = function (props) {
    if (!props.game) {
        return (
            <div>
                <Link to={'/'}>home</Link>
            </div>
        )
    }
    else{
        if(!props.player2){
            return(
                <div>
                    <p>
                        waiting...
                        <br/>
                        gameId: {props.game.id}
                    </p>
                </div>
            )
        }
        else{
            alert("Player two exists now!")
        }
    }
}

const mapStateToProps = state => ({
    user: state.funcs.user,
    game: state.funcs.game,
    player2: state.funcs.player2
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameFrame)
