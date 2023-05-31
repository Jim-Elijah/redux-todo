import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import asyncData from './asyncData'


// function combineReducers(reducerObj) {
//   return function (state, action) {
//     const keys = Object.keys(reducerObj);
//     const newState = {}
//     keys.forEach(key => {
//       const reducer = reducerObj[key]
//       newState[key] = reducer(state[key], action)
//     })
//     return {
//       ...state,
//       ...newState
//     }
//   }
// }

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  asyncData
})

export default todoApp