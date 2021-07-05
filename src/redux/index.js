import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import AsyncDemo from './containers/asyncActionDemo'


let store

export default class APP extends React.Component {
  constructor(props) {
    super(props)
    store = createStore(todoApp, this.getState(), applyMiddleware(thunk))
    // store = createStore(todoApp, this.getState())
  }
  // 读取本地存储的数据 
  getState = () => {
    const data = localStorage.getItem("todo");
    return data ? JSON.parse(data) : {};
  }
  // 保存本地存储数据
  saveState = (data) => {
    localStorage.setItem("todo", JSON.stringify(data));
  }
  componentDidMount() {
    window.onbeforeunload = () => {
      this.saveState(store.getState());
    };
  }
  render() {
    return <Provider store={store}>
      <App />
      <hr />
      <AsyncDemo />
    </Provider>
  }
}