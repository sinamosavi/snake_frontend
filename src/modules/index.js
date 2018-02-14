import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import funcs from './funcs'

export default combineReducers({
  router: routerReducer,
    funcs
})
