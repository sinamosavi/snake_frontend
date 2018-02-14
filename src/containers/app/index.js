import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'
import SignUp from '../signUp'
import Game from '../Game'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    signOut
} from '../../modules/funcs'
import withRouter from "react-router-dom/es/withRouter";

const App = (props) => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/login" style={{display: !props.user ? '' : 'none' }}>Login</Link>
      <Link to="/signUp" style={{display: !props.user ? '' : 'none' }}>SignUp</Link>
      <button style={{display: props.user ? '' : 'none' }} onClick={props.signOut}>Sign out</button>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/game" component={Game} />
    </main>
  </div>
)

const mapStateToProps = state => ({
    user: state.funcs.user,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    signOut,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
