const combineReducer = (reducerObj) => {
  return function (state, action) {
    const keys = Object.keys(reducerObj);
    const newState = {}
    keys.forEach(key => {
      const reducer = reducerObj[key]
      newState[key] = reducer(state[key], action)
    })
    return {
      ...state,
      ...newState
    }
  }
}

function createStore(reducer, enhance = {}) {
  let state = {},
    listeners = []
  const getState = () => {
    return state
  }
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(fn => fn())
  }
  const subscribe = (fn) => {
    listeners.push(fn)
    return () => {
      unsubscribe(fn)
    }
  }
  const unsubscribe = (listener) => {
    let index = listeners.indexOf(listener)
    if (index === -1) {
      listeners.splice(index)
    }
  }
  return {
    getState,
    dispatch,
    subscribe,
  }
}
const initialState = {
  num: 0
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        num: state.num + 1
      }
    case 'SUB':
      return {
        ...state,
        num: state.num - 1
      }
    default:
      return state
  }
}

let store = createStore(reducer)
let sub1 = store.subscribe(() => {
  let state = store.getState()
  console.log('sub1:', state.num)
})
let sub2 = store.subscribe(() => {
  let state = store.getState()
  console.log('sub2:', state.num)
})

const createAdd = () => {
  return {
    type: 'ADD'
  }
}

/**
 * 
 * @param {Object || Function} actionCreators 
 * @param {Function} dispatch 
 * @returns Object
 */
const bindActionCreators = (actionCreators, dispatch) => {
  if(typeof actionCreators === 'function' ){
    return (action) => dispatch(actionCreators(action))
  }
  const keys = Object.keys(actionCreators)
  const bindActionCreators = {}
  keys.forEach(key => {
    const actionCreator = actionCreators[key]
    bindActionCreators[key] = (action) => {
      dispatch(actionCreator(action))
    }
  })
  return bindActionCreators
}

/**
 * <Provider store={store}>
 *    <Comp></Comp>
 * </Provider>
 */
let store = React.createContext(store)
class Provider extends React.Component {
  constructor(props){
    super(props)
  }
  static contextType = this.props.store
  render() {
    return <React.Fragment>
      this.props.children
    </React.Fragment>
  }
}

/**
 * connect({},Comp) -> newComp
 * 返回一个HOC的高阶函数
 */

// ToDo
function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComp) => {
    return class newComp extends React.Component {

      render() {
        <WrappedComp />
      }
    }
  }
  
  
}

// applyMiddlewares


// compose

// enhancer