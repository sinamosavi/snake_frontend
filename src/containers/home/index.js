import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    createNewGame,
    joinToGame,
} from '../../modules/funcs'
import {Link} from "react-router-dom";
import withRouter from "react-router-dom/es/withRouter";


class JoinForm extends React.Component {
    join(e) {
        e.preventDefault();
        let gameId = this.refs.gameId.value;
        this.props.onJoin(gameId)
    }
    render() {
        return (
            <form onSubmit={this.join.bind(this)}>
                <h3>join to game</h3>
                <input type="text" ref="gameId" placeholder="gameId: "/>
                <button type="submit">Join</button>
            </form>
        )
    }
}

const Home = props => (
  <div>
    <h1>Home</h1>
      <button onClick={props.createNewGame} disabled={!props.user ? true : false}><Link to="/game">createNewGame</Link></button>
      <JoinForm onJoin={props.joinToGame}/>
  </div>
)

const mapStateToProps = state => ({
    user: state.funcs.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createNewGame,
    joinToGame,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
