import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import SnakeLadder from "./SnakeLadder";


const GameFrame = function (props) {
    if (!props.game) {
        return (
            <div>
                <Link to={'/'}>home</Link>
            </div>
        )
    }
    else{
        if(props.player2 === null || props.player2 === undefined){
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
            return(
                <div>
                    <SnakeLadder/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.funcs.user,
    game: state.funcs.game,
    player2: state.funcs.player2
})


export default connect(
    mapStateToProps
)(GameFrame)
