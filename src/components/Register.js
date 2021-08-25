import React from 'react'
import { useState } from 'react'
import logo from '../images/logo.svg'
import * as mestoAuth from '../utils/mestoAuth'


export default function Register(props) {

  const [email, setEmail] = useState('') // Стэйт для мыла
  const [pass, setPass] = useState('')  // Стэйт для пароля

  const handleEmail = e => setEmail(e.target.value)
  const handlePass = e => setPass(e.target.value)

  //  Обработчик для сабмита формы
  const handleSubmit = e => {
    e.preventDefault()
    mestoAuth.registration(pass, email)
    setEmail('')
    setPass('')
    props.switchToLogin()
  }
  

  return (
    <div className="register enter-site">
      <div className="register__header enter-site__header">
        <img className="register__logo enter-site__logo" src={logo} alt="Mesto Russia"></img>
        <button className="register__reg-btn enter-site__reg-btn" onClick={props.switchToLogin}>Вход</button>
      </div>

      <form className="register__form enter-site__form" onSubmit={handleSubmit}>
        <div className="register__input-container test enter-site__input-container">
          <h2 className="register__heading enter-site__heading">Регистрация</h2>
          <input className="register__input input enter-site__input" placeholder="Email" type="email" onChange={handleEmail} value={email} required></input>
          <input className="register__input input enter-site__input" placeholder="Пароль" type="password" onChange={handlePass} value={pass} required></input>
        </div>
        
        <button className="register__submit enter-site__submit" type="submit">Зарегистрироваться</button>

        <div className="register__title-and-btn-container">
          <p className="register__title">Уже зарегистрированы?</p>
          <button className="register__entr-btn" onClick={props.switchToLogin}>Войти</button>
        </div>
      </form>

    </div>
  )

}
