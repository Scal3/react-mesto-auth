import React from 'react'
import { useState } from 'react'
import logo from '../images/logo.svg'
import * as mestoAuth from '../utils/mestoAuth'


export default function Login(props) {
  const [email, setEmail] = useState('') // Стэйт для мыла
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPass(e.target.value)

  //  Обработчик для сабмита формы
  const handleSubmit = e => {
    e.preventDefault()
    mestoAuth.authorization(pass, email)
    props.handleLogin()
    props.onLogin()
    setEmail('')
    setPass('')
  }

 
  return (
    <div className="login  enter-site">
      <div className="login__header enter-site__header">
        <img className="login__logo enter-site__logo" src={logo} alt="Mesto Russia"></img>
        <button className="login__reg-btn enter-site__reg-btn" onClick={props.switchToRegistration}>Регистрация</button>
      </div>

        <form className="login__form enter-site__form" onSubmit={handleSubmit}>
          <div className="login__input-container test enter-site__input-container">
            <h2 className="login__title enter-site__heading">Вход</h2>
            <input className="login__input input enter-site__input" placeholder="Email" type="email" required onChange={handleEmail} value={email}></input>
            <input className="login__input input enter-site__input" placeholder="Пароль" type="password" required onChange={handlePass} value={pass}></input>
          </div>
        
          <button className="login__submit enter-site__submit" type="submit">Войти</button>
        </form>
    </div>
  )

}