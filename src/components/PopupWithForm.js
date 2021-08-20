import React from "react"

function PopupWithForm(props) {

  //Переменная для присвоения класса открытого попапа
  let open = null

  //Проверка стэйта
  if (props.isOpen === true) {
    open = 'popup_opened'
  }

  return (
    <div className={`popup popup_type_${props.name} ${open}`}>
      <div className="popup__container">
        <button className={`popup__close-button popup__close-button_type_${props.name}`} type="button" aria-label="Закрыть" onClick={props.onClose}/>
        <h2 className="popup__heading">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}-form`} method="POST" action="#" autoComplete="off" onSubmit={props.onSubmit}>
          <fieldset className="popup__set">
            {props.children}
            <button type="submit" className="popup__submit">{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm