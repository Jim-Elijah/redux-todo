const asyncAction = (state={isFetch: false}, action) => {
  switch(action.type){
    case 'FETCH_DATA':
      return {
        ...state,
        isFetch: action.isFetch,
      }
    case 'RECEIVE_DATA':
      return {
        ...state,
        isFetch: action.isFetch,
        data: action.data,
      }
    default:
      return state
  }

}

export default  asyncAction