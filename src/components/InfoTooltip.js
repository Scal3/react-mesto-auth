import React from 'react'
// import { useState } from 'react'
// import { Route, Switch } from 'react-router-dom'
import success from '../images/icon-reg-success.svg'
import error from '../images/icon-reg-error.svg'

export default function InfoTooltip(props) {

  const messSuccess = 'Вы успешно зарегистрировались!'
  const messErr = 'Что-то пошло не так! Попробуйте ещё раз.'

  const altMessSuccess = 'Удача!'
  const altMessErr = 'Ошибка'

  //Переменная для присвоения класса открытого попапа
  let open = false

  //Проверка стэйта
  if (props.isOpen === true) {
    open = 'popup_opened'
  }

  return (
    <div className={`popup infoTooltip ${open}`}>
      <div className="popup__container infoTooltip__container">
        <img className="infoTooltip__img" src={props.result ? success : error} alt={props.result ? altMessSuccess : altMessErr}></img>
        <p className="infoTooltip__message">{props.result ? messSuccess : messErr}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}/>
      </div>
    </div>
  )
  
}