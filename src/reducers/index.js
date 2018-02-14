import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import funcs from './allactions'
import movers from './movers'

export default combineReducers({
  router: routerReducer,
    funcs,
    movers
})
