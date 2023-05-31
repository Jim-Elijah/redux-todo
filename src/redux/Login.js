import React from 'react'

export default class Login extends React.Component {
  state = {
    phone: '',
    inputCode: '',
    code: '',
    shouldResend: false,
    totalTimeLeft: 10,
    timeLeft: 0,
    timer: null,
  }

  changeHandler = (key) => (e) => {
    const value = e.target.value
    console.log('onChange', key, value)
    this.setState({
      [key]: value
    })
  }

  validatePhone = (phone) => {
    const trimedPhone = phone.trim()
    if (!trimedPhone) {
      alert('请输入手机号')
      return false
    }
    const regEx = /^1[3-8]\d{9}$/
    const isValid = regEx.test(trimedPhone)
    if (!isValid) {
      alert('请输入正确格式的手机号')
      return false
    }
    return true
  }

  getCode = () => {
    let { phone } = this.state
    if (this.validatePhone(phone)) {
      this.setTimer()
    }
  }

  setTimer = () => {
    const { timer: prevTimer, timeLeft, totalTimeLeft } = this.state
    // 倒计时继续时（6s后重新发送）不可点击  
    if (timeLeft) {
      return
    }

    prevTimer && clearInterval(prevTimer)
    let timer = setInterval(() => {
      const { timeLeft, timer } = this.state
      if (timeLeft === 1) {
        timer && clearInterval(timer)
        this.setState({
          timeLeft: 0,
          // 验证码过期，需要重新获取
          shouldResend: true
        })
        return
      }
      this.setState({
        timeLeft: timeLeft - 1
      })
    }, 1000)

    this.setState({
      code: Math.random().toString().slice(-6),
      timer,
      timeLeft: totalTimeLeft,
      shouldResend: false,
    })
  }

  loginHandler = () => {
    let { phone, code, inputCode, shouldResend } = this.state
    if (!this.validatePhone(phone)) {
      return
    }
    console.log('login validate code', code, inputCode, shouldResend)
    const trimedInputCode = inputCode.trim()
    if (!trimedInputCode) {
      alert('请输入短信验证码!')
      return
    }
    if (!code || shouldResend) {
      alert('请先获取验证码!')
      return
    }
    if (trimedInputCode && code !== trimedInputCode) {
      alert('验证码错误!')
      return
    }
    alert('验证码正确!')
  }



  render() {
    let { phone, code, inputCode, timeLeft } = this.state
    console.log('code', code)
    return <div>
      <input placeholder='请输入手机号' value={phone} onChange={this.changeHandler('phone')} />
      <div>
        <input placeholder='请输入验证码' value={inputCode} onChange={this.changeHandler('inputCode')} />
        <button onClick={this.getCode}>{code ? timeLeft ? `${timeLeft}秒后重发` : '重新发送' : '获取验证码'}</button>
      </div>
      <button onClick={this.loginHandler}>登录</button>
    </div>

  }
}