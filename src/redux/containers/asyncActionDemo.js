import React from 'react'
import { connect } from 'react-redux'
import { onFetch } from '../actions'


class AsyncDemo extends React.Component {
  clickHandler = () => {
    const { onFetch } = this.props
    onFetch()
  }
  render() {
    const { isFetch, data} = this.props
    console.log('render', this.props)
    return (
      <div>
        <p style={{color: 'green', fontSize: '14px'}}>{isFetch ? 'Loading...' : 'asyncDemo'}</p>
        <p>{data ? data : ''}</p>
        <button disabled={isFetch} onClick={this.clickHandler}>fetch</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.asyncData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetch: () => {
      dispatch(onFetch())
    }
  }
}

const AsyncDemo1 = connect(mapStateToProps, mapDispatchToProps)(AsyncDemo)

export default AsyncDemo1
