// let nextTodoId = 0

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: parseInt(Math.random().toString().slice(-5)),
    text
  }
}
export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    id
  }
}
export const ModifyTodo = (id, text) => {
  return {
    type: 'MODIFY_TODO',
    id, 
    text
  }
}
export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
export const clearTodo = () => {
  return {
    type: 'CLEAR_TODO'
  }
}

// // 设置完成状态
export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const fetchData = () => {
  return {
    type: 'FETCH_DATA',
    isFetch: true
  }
}

export const mockFetch = () => new Promise((resolve, reject) => {
   setTimeout(() => {
      console.log('mockFetch promise')
      const flag = Math.random();
      console.log('flag', flag)
      return flag > 0.5 ? resolve('greater') : reject('less')
    }, 500);
})

export const onSuccess = (data) => {
  return {
    type: 'RECEIVE_DATA',
    isFetch: false,
    data: data,
  }
}

export const onError = (data) => {
  return {
    type: 'RECEIVE_DATA',
    isFetch: false,
    data,
  }
}

export const onFetch = () => (dispacth, getState, rest) => {
  dispacth(fetchData())
  console.log('onFetch', dispacth, getState, rest)
  return mockFetch().then(
    data => dispacth(onSuccess(data)),
    err => dispacth(onError(err))
  )
}