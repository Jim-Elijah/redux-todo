import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import asyncData from './asyncData'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  asyncData
})

export default todoApp